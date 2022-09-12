import { Storage } from '@google-cloud/storage';
import { config } from 'dotenv';

config();

const getTimeCapsulesFromBucket = async () => {
  const { GCP_CLIENT_EMAIL, GCP_PRIVATE_KEY, GCP_PROJECT_ID } = process.env;

  const storage = new Storage({
    projectId: GCP_PROJECT_ID,
    credentials: {
      private_key: GCP_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: GCP_CLIENT_EMAIL,
    },
  });

  const [files] = await storage
    .bucket('nft-time-capsule.appspot.com')
    .getFiles();

  const timeCapsules = {} as {
    [key: string]: {
      [key: string]: string;
    };
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    const [id, fileType] = file.name.split('.');
    if (timeCapsules[id]) {
      timeCapsules[id] = {
        ...timeCapsules[id],
        [`${fileType}Link`]: `https://storage.googleapis.com/${file.bucket.name}/${file.name}`,
      };
    } else {
      timeCapsules[id] = {
        [`${fileType}Link`]: `https://storage.googleapis.com/${file.bucket.name}/${file.name}`,
      };
    }
  }

  Object.values(timeCapsules).forEach(timeCapsule => {
    if (!timeCapsule.svgLink || !timeCapsule.pngLink) {
      delete timeCapsules[timeCapsule.id];
    }
  });

  return timeCapsules;
};

export { getTimeCapsulesFromBucket };
