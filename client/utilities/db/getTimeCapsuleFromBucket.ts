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

  const svgResult = await storage
    .bucket('nft-time-capsule.appspot.com')
    .file(`${id}.svg`);

  const pngResult = await storage
    .bucket('nft-time-capsule.appspot.com')
    .file(`${id}.png`);

  const [svgDoesExists] = await svgResult.exists();
  const [pngDoesExists] = await pngResult.exists();

  if (svgDoesExists && pngDoesExists) {
    const [svgTimeCapsule] = await svgResult.getMetadata();
    const [pngTimeCapsule] = await pngResult.getMetadata();

    return {
      svgLink: `https://storage.googleapis.com/${svgTimeCapsule.bucket}/${svgTimeCapsule.name}`,
      pngLink: `https://storage.googleapis.com/${pngTimeCapsule.bucket}/${pngTimeCapsule.name}`,
    };
  }

  return '';
}

export default getTimeCapsuleFromBucket;
