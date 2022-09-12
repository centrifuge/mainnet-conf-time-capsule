import type { NextApiRequest, NextApiResponse } from 'next';
import { getTimeCapsuleFromBucket } from '../../../utilities/db/getTimeCapsuleFromBucket';
import { getTimeCapsuleFromFirestore } from '../../../utilities/db/getTimeCapsuleFromFirestore';

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
const handler = async (req: Request, res: NextApiResponse<Response>) => {
  const { query, method } = req;

  if (method !== 'GET') {
    res.status(405).send('Method not allowed. Use POST.');
  }

  try {
    const imageLinks = await getTimeCapsuleFromBucket(query.id);

    const metadata = await getTimeCapsuleFromFirestore(query.id);

    if (imageLinks && metadata && metadata.status === 'minted') {
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
};

export default handler;
