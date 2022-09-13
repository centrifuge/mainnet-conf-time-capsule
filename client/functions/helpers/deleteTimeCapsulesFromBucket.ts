import { Storage } from '@google-cloud/storage';
import { config } from 'dotenv';

config();

const deleteTimeCapsulesFromBucket = async (id: string) => {
  const { GCP_CLIENT_EMAIL, GCP_PRIVATE_KEY, GCP_PROJECT_ID } = process.env;

  const storage = new Storage({
    projectId: GCP_PROJECT_ID,
    credentials: {
      private_key: GCP_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: GCP_CLIENT_EMAIL,
    },
  });

  await storage
    .bucket('nft-time-capsule.appspot.com')
    .file(`${id}.png`)
    .delete();

  await storage
    .bucket('nft-time-capsule.appspot.com')
    .file(`${id}.svg`)
    .delete();
};

export { deleteTimeCapsulesFromBucket };
