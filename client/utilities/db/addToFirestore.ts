// eslint-disable-next-line import/no-unresolved
import { initializeApp, cert } from 'firebase-admin/app';
// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore';
import { TimeCapsule } from '../../types';

interface FirestoreEntry extends TimeCapsule {
  svg: string;
  hash: string;
}

async function addToFirestore({
  id,
  svg,
  hash,
  svgLink,
  timestamp,
}: FirestoreEntry) {
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

  const docRef = db.collection('predictions').doc(id);

  await docRef.set({
    svg,
    hash,
    svgLink,
    timestamp,
  });
}

export default addToFirestore;
