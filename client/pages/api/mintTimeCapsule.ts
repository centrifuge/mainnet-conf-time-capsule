import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import addToBucket from '../../utilities/db/addToBucket';
import addToFirestore from '../../utilities/db/addToFirestore';
import handleMint from '../../utilities/handleMint';
import getTimeCapsuleFromBucket from '../../utilities/db/getTimeCapsuleFromBucket';
import generateSVG from '../../utilities/generateSVG';
import validationSchema from '../../utilities/validationSchema';

type Response =
  | {
      hash: string;
      id: string;
    }
  | unknown
  | string;

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

      const { hash } = await handleMint(polygonAddress, uniqueId);

      const svg = generateSVG(prediction, twitterHandle);

      const filePath = path.join(tempPath, `${uniqueId}.svg`);

      await fs.writeFile(filePath, svg);

      await addToBucket(uniqueId, filePath);

      const svgLink = await getTimeCapsuleFromBucket(uniqueId);

      const timeCapsule = {
        id: uniqueId,
        svg,
        hash,
        svgLink,
        timestamp: Date.now(),
      };

      await addToFirestore(timeCapsule);

      res.status(200).json({
        hash,
        id: uniqueId,
      });
    } else {
      res.status(200).json('Invalid request');
    }
  } catch (error) {
    res.status(500).json(error);
  }
}
