// eslint-disable-next-line import/no-unresolved
import { initializeApp, cert } from 'firebase-admin/app';
// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore';
import { TimeCapsule } from '../../types';

async function getTimeCapsules() {
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
    const { polygonAddress, svg, hash, svgLink } = doc.data();

    timeCapsules.push({
      id: doc.id,
      polygonAddress,
      svg,
      hash,
      svgLink,
    });
  });

  return timeCapsules;
}

export default getTimeCapsules;
