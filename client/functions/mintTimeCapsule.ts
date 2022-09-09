import { Handler } from '@netlify/functions';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { Storage } from '@google-cloud/storage';
import { config } from 'dotenv';
import chromium from 'chrome-aws-lambda';
import addToFirestore from '../utilities/db/addToFirestore';
import getTimeCapsuleFromBucket from '../utilities/db/getTimeCapsuleFromBucket';
import generateSVG from '../utilities/generateSVG';
import validationSchema from '../utilities/validationSchema';
import { FirestoreEntry } from '../types';

config();

async function addToBucket(svgPath: string) {
  const { GCP_CLIENT_EMAIL, GCP_PRIVATE_KEY, GCP_PROJECT_ID } = process.env;

  const storage = new Storage({
    projectId: GCP_PROJECT_ID,
    credentials: {
      private_key: GCP_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: GCP_CLIENT_EMAIL,
    },
  });

  const fileName = svgPath.split('/').pop();

  const result = await storage
    .bucket('nft-time-capsule.appspot.com')
    .upload(svgPath, {
      destination: fileName,
    });

  return result;
}

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
      const browser = await chromium.puppeteer.launch({
        args: await chromium.args,
        executablePath:
          // '/usr/local/bin/chromium' ||
          await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
      });

      const page = await browser.newPage();
      await page.setViewport({ width: 1600, height: 900 });
      const svg = generateSVG(prediction, twitterHandle);
      await page.setContent(svg);

      const tempPath = os.tmpdir();
      const pngFilePath = path.join(tempPath, `${uniqueId}.png`);
      await page.screenshot({ path: pngFilePath });

      await browser.close();

      const svgFilePath = path.join(tempPath, `${uniqueId}.svg`);
      await fs.writeFile(svgFilePath, svg);

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

        return {
          statusCode: 200,
          body: JSON.stringify({ id: uniqueId }),
        };
      }

      return {
        statusCode: 500,
        body: JSON.stringify('Something went wrong!'),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify('Invalid request'),
    };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify('Something went wrong!'),
    };
  }
};

export { handler };
