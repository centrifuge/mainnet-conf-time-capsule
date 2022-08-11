import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data =
  | {
      isValidUser: boolean;
    }
  | Error
  | string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { query, method } = req;

  if (method !== 'GET') {
    res.status(405).send('Method not allowed. Use GET.');
  }

  const twitterHandle = query.twitterHandle as string;

  try {
    if (twitterHandle && /^@?(\w){1,15}$/.test(twitterHandle)) {
      const { data } = await axios.get(
        `https://api.twitter.com/2/users/by?usernames=${twitterHandle.replace(
          '@',
          '',
        )}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
          },
        },
      );

      const isValidUser = !!data.data;

      if (isValidUser) {
        res.status(200).json({
          isValidUser: true,
        });
      }
    }

    res.status(200).json({ isValidUser: false });
  } catch (error) {
    res.status(500).json(new Error('Internal server error'));
  }
}
