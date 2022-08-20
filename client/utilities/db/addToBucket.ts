import { Storage } from '@google-cloud/storage';

async function addToBucket(id: string, svgPath: string) {
  const { GCP_CLIENT_EMAIL, GCP_PRIVATE_KEY, GCP_PROJECT_ID } = process.env;

  const storage = new Storage({
    projectId: GCP_PROJECT_ID,
    credentials: {
      private_key: GCP_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: GCP_CLIENT_EMAIL,
    },
  });

  const result = await storage
    .bucket('nft-time-capsule.appspot.com')
    .upload(svgPath, {
      destination: `${id}.svg`,
    });

  return result;
}

export default addToBucket;