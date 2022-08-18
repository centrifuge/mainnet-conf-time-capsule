import type { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line import/no-unresolved
import { initializeApp, cert } from 'firebase-admin/app';
// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore';

type TimeCapsule = {
  id: string;
  twitterHandle: string;
  prediction: string;
  polygonAddress: string;
  svg: string;
};

type Response = Partial<TimeCapsule> | Error | string;

const { GCP_CLIENT_EMAIL, GCP_PRIVATE_KEY, GCP_PROJECT_ID } = process.env;

async function getTimeCapsule(id: string) {
  try {
    initializeApp({
      credential: cert({
        clientEmail: GCP_CLIENT_EMAIL,
        privateKey: GCP_PRIVATE_KEY.replace(/\\n/g, '\n'),
        projectId: GCP_PROJECT_ID,
      }),
    });
    // eslint-disable-next-line no-empty
  } catch {}

  const db = getFirestore();

  const snapshot = await db.collection('predictions').get();

  let timeCapsule = {};

  snapshot.forEach(doc => {
    const { twitterHandle, prediction, polygonAddress, svg } = doc.data();

    if (doc.id === id) {
      timeCapsule = {
        id: doc.id,
        twitterHandle,
        prediction,
        polygonAddress,
        svg,
      };
    }
  });
  return timeCapsule;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  const { query, method } = req;

  if (method !== 'GET') {
    res.status(405).send('Method not allowed. Use POST.');
  }

  try {
    const timeCapsule = await getTimeCapsule(query.id as string);

    res.status(200).json(timeCapsule);
  } catch (error) {
    res.status(500).json(new Error('Internal server error'));
  }
}
