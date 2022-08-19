import { Storage } from '@google-cloud/storage';

async function getTimeCapsuleFromBucket(id: string) {
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
    .file(`${id}.svg`);

  const [doesExists] = await result.exists();

  if (doesExists) {
    const [timeCapsule] = await result.getMetadata();

    const { bucket, name } = timeCapsule;

    return `https://storage.googleapis.com/${bucket}/${name}`;
  }

  return '';
}

export default getTimeCapsuleFromBucket;
