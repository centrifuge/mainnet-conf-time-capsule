import type { NextApiRequest, NextApiResponse } from 'next';
import getTimeCapsuleFromBucket from '../../../utilities/db/getTimeCapsuleFromBucket';
import queryTimeCapsule from '../../../utilities/queries/queryTimeCapsule';

type Response =
  | {
      name: 'Centrifuge Time Capsule';
      description: 'Your prediction for DeFi in 2023';
      image: string;
    }
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

    if (nft && imageLinks) {
      res.status(200).json({
        name: 'Centrifuge Time Capsule',
        description: 'Your prediction for DeFi in 2023',
        image: imageLinks.svgLink,
      });
    } else {
      res.status(200).json('Not found');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error);
    } else {
      res.status(500).json('Something went wrong!');
    }
  }
}
