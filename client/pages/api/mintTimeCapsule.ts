import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
// eslint-disable-next-line import/no-unresolved
import { initializeApp, cert } from 'firebase-admin/app';
// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore';
import abi from '../../utilities/abi.json';
import { TimeCapsule } from '../../types';

type Response = { hash: string; svg: string; id: string } | Error | string;

const { GCP_CLIENT_EMAIL, GCP_PRIVATE_KEY, GCP_PROJECT_ID } = process.env;

async function deleteFromDb(id: string) {
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

  await db.collection('predictions').doc(id).delete();
}

async function addToDb({
  id,
  polygonAddress,
  prediction,
  twitterHandle,
  svg,
  status,
}: TimeCapsule) {
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
    polygonAddress,
    prediction,
    svg,
    twitterHandle,
    status,
  });
}

async function handleMint(polygonAddress: string, uniqueId: string) {
  const { INFURA_RPC_URL, HOT_WALLET_PRIVATE_KEY, MINT_CONTRACT_ADDRESS } =
    process.env;

  const provider = new ethers.providers.JsonRpcProvider(INFURA_RPC_URL);

  const privateKey = HOT_WALLET_PRIVATE_KEY;
  const signer = new ethers.Wallet(privateKey, provider);

  const address = MINT_CONTRACT_ADDRESS;

  const timeCapsuleNftContract = new ethers.Contract(address, abi, signer);

  const result = await timeCapsuleNftContract.mint(polygonAddress, uniqueId);

  return result;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  const { method } = req;

  if (method !== 'POST') {
    res.status(405).send('Method not allowed. Use POST.');
  }

  const uniqueId = Math.ceil(Math.random() * (2 ** 53 - 1)).toString();

  const { polygonAddress, prediction, twitterHandle, svg } = req.body;

  const timeCapsule = {
    id: uniqueId,
    polygonAddress,
    prediction,
    twitterHandle,
    svg,
  };

  try {
    await addToDb({ ...timeCapsule, status: 'pending' });

    const { hash, wait } = await handleMint(polygonAddress, uniqueId);

    const { status } = await wait();

    if (status === 1) {
      await addToDb({ ...timeCapsule, status: 'minted' });
      res.status(200).json({ hash, svg, id: uniqueId });
    } else {
      await deleteFromDb(uniqueId);

      res.status(500).json(new Error('Internal server error'));
    }
  } catch (error) {
    await addToDb({ ...timeCapsule, status: 'failed' });

    res.status(500).json(new Error('Internal server error'));
  }
}
