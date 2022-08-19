import type { NextApiRequest, NextApiResponse } from 'next';
import getTimeCapsuleFromBucket from '../../../utilities/db/getTimeCapsuleFromBucket';
import getTimeCapsuleFromFirestore from '../../../utilities/db/getTimeCapsuleFromFirestore';
import queryTimeCapsule from '../../../utilities/queries/queryTimeCapsule';

type Response =
  | unknown
  | string
  | boolean
  | { status: 'pending' | 'minted'; hash?: string; svgLink?: string };

interface Request extends NextApiRequest {
  query: {
    id: string;
  };
}

export default async function handler(
  req: Request,
  res: NextApiResponse<Response>,
) {
  const { query, method } = req;

  if (method !== 'GET') {
    res.status(405).send('Method not allowed. Use POST.');
  }

  try {
    const { nft } = await queryTimeCapsule(query.id);

    if (nft) {
      const svgLink = await getTimeCapsuleFromBucket(query.id);

      if (svgLink) {
        res.status(200).json({
          status: 'minted',
          svgLink,
        });
      }
    } else {
      const metadata = await getTimeCapsuleFromFirestore(query.id);

      if (metadata) {
        res.status(200).json({ status: 'pending', hash: metadata.hash });
      } else {
        res.status(200).json(false);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
}
