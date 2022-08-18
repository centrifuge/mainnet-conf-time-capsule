import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
// eslint-disable-next-line import/no-unresolved
import { initializeApp, cert } from 'firebase-admin/app';
// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore';
import abi from '../../utilities/abi.json';

type Response = { hash: string; svg: string } | Error | string;

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

async function addToDb(
  id: string,
  polygonAddress: string,
  prediction: string,
  twitterHandle: string,
  svg: string,
) {
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

  try {
    const { polygonAddress, prediction, twitterHandle, svg } = req.body;

    await addToDb(uniqueId, polygonAddress, prediction, twitterHandle, svg);

    const { hash, wait } = await handleMint(polygonAddress, uniqueId);

    const { status } = await wait();

    if (status === 1) {
      res.status(200).json({ hash, svg });
    } else {
      await deleteFromDb(uniqueId);

      res.status(500).json(new Error('Internal server error'));
    }
  } catch (error) {
    await deleteFromDb(uniqueId);

    res.status(500).json(new Error('Internal server error'));
  }
}
