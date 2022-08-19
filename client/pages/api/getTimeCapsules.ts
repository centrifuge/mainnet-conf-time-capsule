import type { NextApiRequest, NextApiResponse } from 'next';
import getTimeCapsules from '../../utilities/db/getTimeCapsules';
import queryTimeCapsules from '../../utilities/queries/queryTimeCapsules';

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
    const timeCapsulesFromFirestore = await getTimeCapsules();

    const timeCapsuleDictionary = timeCapsulesFromFirestore.reduce<{
      [id: string]: string;
    }>(
      (acc, cur) => ({
        ...acc,
        [cur.id]: cur.svgLink,
      }),
      {},
    );

    const { nfts } = await queryTimeCapsules();

    const timeCapsules = nfts
      .map((nft: { id: string; svg: string }) => ({
        id: nft.id,
        svgLink: timeCapsuleDictionary[nft.id],
      }))
      .filter(({ svgLink }: { svgLink?: string }) => svgLink);

    res.status(200).json(timeCapsules);
  } catch (error) {
    res.status(500).json(error);
  }
}
