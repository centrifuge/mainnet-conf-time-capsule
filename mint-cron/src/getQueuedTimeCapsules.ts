import { config } from 'dotenv';
// eslint-disable-next-line import/no-unresolved
import { initializeApp, cert } from 'firebase-admin/app';
// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore';

config();

async function getQueuedTimeCapsules() {
  const { GCP_CLIENT_EMAIL, GCP_PRIVATE_KEY, GCP_PROJECT_ID, NETWORK } =
    process.env;

  const bucketName =
    NETWORK === 'mainnet' ? 'time-capsules' : 'time-capsules-testnet';

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

  const snapshot = await db.collection(bucketName).get();

  const timeCapsules: {
    polygonAddress: string;
    id: string;
    timestamp: number;
  }[] = [];

  snapshot.forEach(doc => {
    const { polygonAddress, status, timestamp } = doc.data();

    if (status === 'queued' || status === 'failed') {
      timeCapsules.push({ polygonAddress, id: doc.id, timestamp });
    }
  });

  timeCapsules.sort((a, b) => a.timestamp - b.timestamp);

  return timeCapsules.slice(0, 20);
}

export default getQueuedTimeCapsules;
