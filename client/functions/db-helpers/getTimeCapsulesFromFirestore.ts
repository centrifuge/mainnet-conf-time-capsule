// eslint-disable-next-line import/no-unresolved
import { initializeApp, cert } from 'firebase-admin/app';
// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore';
import { config } from 'dotenv';
import { TimeCapsule } from '../../types';

config();

const getTimeCapsulesFromFirestore = async () => {
  const { GCP_CLIENT_EMAIL, GCP_PRIVATE_KEY, GCP_PROJECT_ID } = process.env;

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

  const timeCapsules: TimeCapsule[] = [];

  snapshot.forEach(doc => {
    const { svgLink, timestamp, status } = doc.data();

    timeCapsules.push({
      id: doc.id,
      status,
      svgLink,
      timestamp,
    });
  });

  return timeCapsules;
};

export { getTimeCapsulesFromFirestore };
