import { Handler } from '@netlify/functions';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { addToFirestore } from '../helpers/addToFirestore';
import { getTimeCapsuleFromBucket } from '../helpers/getTimeCapsuleFromBucket';
import { generateSVG } from '../helpers/generateSVG';
import { validationSchema } from '../../utilities/validationSchema';
import { FirestoreEntry } from '../../types';
import { generatePNG } from '../helpers/generatePNG';
import { addImagesToBucket } from '../helpers/addImagestoBucket';

const handler: Handler = async event => {
  const { httpMethod } = event;

  if (httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method not allowed. Use POST.',
    };
  }

  const uniqueId = Math.ceil(Math.random() * (2 ** 53 - 1)).toString();

  const { polygonAddress, prediction, twitterHandle } = JSON.parse(
    event.body || '',
  );

  try {
    const isValid = await validationSchema.isValid({
      polygonAddress,
      prediction,
      twitterHandle,
    });

    if (isValid) {
      const tempPath = os.tmpdir();

      const svgFilePath = path.join(tempPath, `${uniqueId}.svg`);
      const svg = generateSVG(prediction, twitterHandle);
      await fs.writeFile(svgFilePath, svg);

      const pngFilePath = path.join(tempPath, `${uniqueId}.png`);
      await generatePNG(pngFilePath, svg);

      await addImagesToBucket(tempPath, uniqueId);

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

        return {
          statusCode: 200,
          body: JSON.stringify({ id: uniqueId }),
        };
      }

      return {
        statusCode: 500,
        body: 'Something went wrong!',
      };
    }

    return {
      statusCode: 200,
      body: 'Invalid request',
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    }

    return {
      statusCode: 500,
      body: 'Something went wrong!',
    };
  }
};

export { handler };
