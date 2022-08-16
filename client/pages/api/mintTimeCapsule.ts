import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import abi from '../../utilities/abi.json';

type Data =
  | {
      hash: string;
    }
  | Error
  | string;

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

  const { polygonAddress } = req.body;

  if (method !== 'POST') {
    res.status(405).send('Method not allowed. Use POST.');
  }

  try {
    const { hash } = await handleMint(polygonAddress);
    res.status(200).json({ hash });
  } catch (error) {
    res.status(500).json(new Error('Internal server error'));
  }
}
