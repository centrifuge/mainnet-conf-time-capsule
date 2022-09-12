import { Storage } from '@google-cloud/storage';
import path from 'path';
import { config } from 'dotenv';

config();

const addImagesToBucket = async (tempPath: string, uniqueId: string) => {
  const { GCP_CLIENT_EMAIL, GCP_PRIVATE_KEY, GCP_PROJECT_ID } = process.env;

  const storage = new Storage({
    projectId: GCP_PROJECT_ID,
    credentials: {
      private_key: GCP_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: GCP_CLIENT_EMAIL,
    },
  });

  const pngFilePath = path.join(tempPath, `${uniqueId}.png`);
  const svgFilePath = path.join(tempPath, `${uniqueId}.svg`);

  await storage.bucket('nft-time-capsule.appspot.com').upload(pngFilePath, {
    destination: `${uniqueId}.png`,
  });

  await storage.bucket('nft-time-capsule.appspot.com').upload(svgFilePath, {
    destination: `${uniqueId}.svg`,
  });
};

export { addImagesToBucket };
