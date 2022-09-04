import type { NextApiRequest, NextApiResponse } from 'next';
import getTimeCapsuleFromBucket from '../../../utilities/db/getTimeCapsuleFromBucket';
import getTimeCapsuleFromFirestore from '../../../utilities/db/getTimeCapsuleFromFirestore';
import queryTimeCapsule from '../../../utilities/queries/queryTimeCapsule';

type Response =
  | {
      status: 'pending' | 'minted';
      hash: string;
      svgLink: string;
      pngLink: string;
    }
  | boolean
  | string
  | Error;

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

    const imageLinks = await getTimeCapsuleFromBucket(query.id);

    if (nft) {
      const metadata = await getTimeCapsuleFromFirestore(query.id);

      if (imageLinks && metadata) {
        res.status(200).json({
          status: 'minted',
          svgLink: imageLinks.svgLink,
          pngLink: imageLinks.pngLink,
          hash: metadata.hash,
        });
      }
    } else {
      const metadata = await getTimeCapsuleFromFirestore(query.id);

      if (imageLinks && metadata) {
        res.status(200).json({
          status: 'pending',
          hash: metadata.hash,
          svgLink: imageLinks.svgLink,
          pngLink: imageLinks.pngLink,
        });
      } else {
        res.status(200).json(false);
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error);
    } else {
      res.status(500).json('Something went wrong!');
    }
  }
}
