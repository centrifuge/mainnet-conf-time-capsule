import type { NextApiRequest, NextApiResponse } from 'next';
import { Status } from '../../../types';
import { getTimeCapsuleFromBucket } from '../../../utilities/db/getTimeCapsuleFromBucket';
import { getTimeCapsuleFromFirestore } from '../../../utilities/db/getTimeCapsuleFromFirestore';

type Response =
  | {
      status: Status;
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

const handler = async (req: Request, res: NextApiResponse<Response>) => {
  const { query, method } = req;

  if (method !== 'GET') {
    res.status(405).send('Method not allowed. Use POST.');
  }

  try {
    const imageLinks = await getTimeCapsuleFromBucket(query.id);

    const metadata = await getTimeCapsuleFromFirestore(query.id);

    if (imageLinks && metadata) {
      res.status(200).json({
        status: metadata.status,
        svgLink: imageLinks.svgLink,
        pngLink: imageLinks.pngLink,
        hash: metadata.hash,
      });
    } else {
      res.status(200).json(false);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error);
    } else {
      res.status(500).json('Something went wrong!');
    }
  }
};

export default handler;
