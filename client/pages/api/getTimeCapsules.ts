import type { NextApiRequest, NextApiResponse } from 'next';
import getTimeCapsulesFromFirestore from '../../utilities/db/getTimeCapsulesFromFirestore';

type Response =
  | { id: string; svgLink: string; timestamp: number }[]
  | string
  | Error;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  const { method } = req;

  if (method !== 'GET') {
    res.status(405).send('Method not allowed. Use POST.');
  }

  try {
    const timeCapsulesFromFirestore = await getTimeCapsulesFromFirestore();

    res.status(200).json(timeCapsulesFromFirestore);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error);
    } else {
      res.status(500).json('Something went wrong!');
    }
  }
}
