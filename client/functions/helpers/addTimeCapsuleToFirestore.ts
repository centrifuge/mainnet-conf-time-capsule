// eslint-disable-next-line import/no-unresolved
import { initializeApp, cert } from 'firebase-admin/app';
// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore';
import { FirestoreEntry } from '../../types';

const addTimeCapsuleToFirestore = async ({
  id,
  svg,
  hash,
  polygonAddress,
  status,
  pngLink,
  svgLink,
  timestamp,
}: FirestoreEntry) => {
  const {
    GCP_CLIENT_EMAIL,
    GCP_PRIVATE_KEY,
    GCP_PROJECT_ID,
    NEXT_PUBLIC_NETWORK,
  } = process.env;

  const collectionName =
    NEXT_PUBLIC_NETWORK === 'mainnet'
      ? 'time-capsules'
      : 'time-capsules-testnet';

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

  const docRef = db.collection(collectionName).doc(id);

  await docRef.set({
    svg,
    hash,
    polygonAddress,
    status,
    svgLink,
    pngLink,
    timestamp,
  });
};

export { addTimeCapsuleToFirestore };
