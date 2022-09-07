import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import sharp from 'mysharp';
import addToBucket from '../../utilities/db/addToBucket';
import addToFirestore from '../../utilities/db/addToFirestore';
import getTimeCapsuleFromBucket from '../../utilities/db/getTimeCapsuleFromBucket';
import generateSVG from '../../utilities/generateSVG';
import validationSchema from '../../utilities/validationSchema';
import { FirestoreEntry } from '../../types';

type Response = { id: string } | string | Error;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  const { method } = req;

  if (method !== 'POST') {
    res.status(405).send('Method not allowed. Use POST.');
  }

  const uniqueId = Math.ceil(Math.random() * (2 ** 53 - 1)).toString();

  const { polygonAddress, prediction, twitterHandle } = req.body;

  try {
    const isValid = await validationSchema.isValid({
      polygonAddress,
      prediction,
      twitterHandle,
    });

    if (isValid) {
      const tempPath = os.tmpdir();

      const svg = generateSVG(prediction, twitterHandle);

      const svgFilePath = path.join(tempPath, `${uniqueId}.svg`);

      await fs.writeFile(svgFilePath, svg);

      const png = await sharp(svgFilePath).png().toBuffer();

      const pngFilePath = path.join(tempPath, `${uniqueId}.png`);

      await fs.writeFile(pngFilePath, png);

      await addToBucket(svgFilePath);
      await addToBucket(pngFilePath);

      const imageLinks = await getTimeCapsuleFromBucket(uniqueId);

      if (imageLinks) {
        const timeCapsule: FirestoreEntry = {
          id: uniqueId,
          polygonAddress,
          svg,
          hash: 'queued',
          status: 'queued',
          svgLink: imageLinks.svgLink,
          pngLink: imageLinks.pngLink,
          timestamp: Date.now(),
        };

        await addToFirestore(timeCapsule);

        res.status(200).json({
          id: uniqueId,
        });
      } else {
        res.status(500).json('Something went wrong!');
      }
    } else {
      res.status(200).json('Invalid request');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error);
    } else {
      res.status(500).json('Something went wrong!');
    }
  }
}
