// eslint-disable-next-line import/no-unresolved
import { initializeApp, cert } from 'firebase-admin/app';
// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore';
import { Status } from '../../types';

async function getTimeCapsuleFromFirestore(
  id: string,
): Promise<{ status: Status; hash: string } | false> {
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

  let timeCapsule = {};

  snapshot.forEach(doc => {
    const { hash, status } = doc.data();

    if (doc.id === id) {
      timeCapsule = {
        hash,
        status,
      };
    }
  });

  if (Object.keys(timeCapsule).length) {
    return timeCapsule as { status: Status; hash: string };
  }

  return false;
}

export default getTimeCapsuleFromFirestore;
