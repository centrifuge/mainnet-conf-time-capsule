import type { NextApiRequest, NextApiResponse } from 'next';
import { TimeCapsule } from '../../types';
import { getTimeCapsulesFromFirestore } from '../../utilities/db/getTimeCapsulesFromFirestore';
import { getTimeCapsulesFromBucket } from '../../utilities/db/getTimeCapsulesFromBucket';

type Response = TimeCapsule[] | string | Error;

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const { method } = req;

  if (method !== 'GET') {
    res.status(405).send('Method not allowed. Use POST.');
  }

  try {
    const timeCapsulesFromBucket = await getTimeCapsulesFromBucket();

    const timeCapsulesFromFirestore = await getTimeCapsulesFromFirestore();

    const mintedTimeCapsules = timeCapsulesFromFirestore.filter(
      timeCapsule =>
        timeCapsule.status === 'minted' &&
        timeCapsulesFromBucket[timeCapsule.id],
    );

    res.status(200).json(mintedTimeCapsules);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error);
    } else {
      res.status(500).json('Something went wrong!');
    }
  }
};

export default handler;
