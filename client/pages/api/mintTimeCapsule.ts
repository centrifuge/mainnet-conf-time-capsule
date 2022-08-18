import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
// eslint-disable-next-line import/no-unresolved
import { initializeApp, cert } from 'firebase-admin/app';
// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore';
import abi from '../../utilities/abi.json';

type Response = { hash: string } | Error | string;

const { GCP_CLIENT_EMAIL, GCP_PRIVATE_KEY, GCP_PROJECT_ID } = process.env;

async function addToDb(
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

  const docRef = db.collection('predictions').doc();

  await docRef.set({
    polygonAddress,
    prediction,
    svg,
    twitterHandle,
  });
}

async function handleMint(polygonAddress: string) {
  const { INFURA_RPC_URL, HOT_WALLET_PRIVATE_KEY, MINT_CONTRACT_ADDRESS } =
    process.env;

  const provider = new ethers.providers.JsonRpcProvider(INFURA_RPC_URL);

  const privateKey = HOT_WALLET_PRIVATE_KEY;
  const signer = new ethers.Wallet(privateKey, provider);

  const address = MINT_CONTRACT_ADDRESS;

  const timeCapsuleNftContract = new ethers.Contract(address, abi, signer);

  const result = await timeCapsuleNftContract.mint(polygonAddress);

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

  try {
    const { polygonAddress, prediction, twitterHandle, svg } = req.body;

    const { hash } = await handleMint(polygonAddress);

    await addToDb(polygonAddress, prediction, twitterHandle, svg);

    res.status(200).json({ hash });
  } catch (error) {
    res.status(500).json(new Error('Internal server error'));
  }
}
