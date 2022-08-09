import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
  | {
      nftAddress: string;
    }
  | Error;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    // mint nft
    res.status(200).json({ nftAddress: '0x' });
  } catch (error) {}
  res.status(500).json(new Error('Internal server error'));
}
