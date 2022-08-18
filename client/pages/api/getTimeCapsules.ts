import type { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line import/no-unresolved
import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccountKey from '../../../nft-time-capsule-service-account.json';

type TimeCapsule = {
  id: string;
  twitterHandle: string;
  prediction: string;
  polygonAddress: string;
  svg: string;
};

async function getTimeCapsules() {
  try {
    initializeApp({
      credential: cert(serviceAccountKey as ServiceAccount),
    });
    // eslint-disable-next-line no-empty
  } catch {}

  const db = getFirestore();

  const snapshot = await db.collection('predictions').get();

  const timeCapsules: TimeCapsule[] = [];

  snapshot.forEach(doc => {
    const { twitterHandle, prediction, polygonAddress, svg } = doc.data();

    timeCapsules.push({
      id: doc.id,
      twitterHandle,
      prediction,
      polygonAddress,
      svg,
    });
  });

  return timeCapsules;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { method } = req;

  if (method !== 'GET') {
    res.status(405).send('Method not allowed. Use POST.');
  }

  try {
    const timeCapsules = await getTimeCapsules();

    res.status(200).json(timeCapsules);
  } catch (error) {
    res.status(500).json(new Error('Internal server error'));
  }
}
