import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
// eslint-disable-next-line import/no-unresolved
import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
// eslint-disable-next-line import/no-unresolved
import { getFirestore } from 'firebase-admin/firestore';
import abi from '../../utilities/abi.json';
import serviceAccountKey from '../../../nft-time-capsule-service-account.json';

type Data =
  | {
      hash: string;
    }
  | Error
  | string;

async function addToDb(
  polygonAddress: string,
  prediction: string,
  twitterHandle: string,
  svg: string,
) {
  try {
    initializeApp({
      credential: cert(serviceAccountKey as ServiceAccount),
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
  const { INFURA_RPC_URL, HOT_WALLET_PRIVATE_KEY } = process.env;

  const provider = new ethers.providers.JsonRpcProvider(INFURA_RPC_URL);

  const privateKey = HOT_WALLET_PRIVATE_KEY as string;
  const signer = new ethers.Wallet(privateKey, provider);

  const address = '0x936E7043f204cd36Cd92009d44BF6b8129f6007B';

  const timeCapsuleNftContract = new ethers.Contract(address, abi, signer);

  const result = await timeCapsuleNftContract.mint(polygonAddress);

  return result;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
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
