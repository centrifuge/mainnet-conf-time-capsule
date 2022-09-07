import { config } from 'dotenv';
// eslint-disable-next-line import/no-unresolved
import { initializeApp, cert } from 'firebase-admin/app';
// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore';

config();

async function updateFirestore(
  id: string,
  status: number | null,
  hash?: string,
) {
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

  const timeCapsuleRef = await db.collection('predictions').doc(id);

  if (status === 0) {
    return timeCapsuleRef.update({ status: 'failed' });
  }

  if (status === 1) {
    return timeCapsuleRef.update({ status: 'minted' });
  }

  if (status === null) {
    return timeCapsuleRef.update({ status: 'pending', hash });
  }
}

export default updateFirestore;