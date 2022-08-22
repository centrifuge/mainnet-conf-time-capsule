import type { NextApiRequest, NextApiResponse } from 'next';
import getTimeCapsulesFromFirestore from '../../utilities/db/getTimeCapsulesFromFirestore';

type Response = { id: string; svgLink: string }[] | unknown | string;

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
    res.status(500).json(error);
  }
}
