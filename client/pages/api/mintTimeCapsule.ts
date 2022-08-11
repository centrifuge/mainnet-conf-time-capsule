import type { NextApiRequest, NextApiResponse } from 'next';
import ethers from 'ethers';
import axios from 'axios';

type Data =
  | {
      nftAddress: string;
    }
  | Error
  | string;

// eslint-disable-next-line no-unused-vars
async function handleMint() {
  const { INFURA_RPC_URL, HOT_WALLET_PRIVATE_KEY } = process.env;

  const provider = new ethers.providers.JsonRpcProvider(INFURA_RPC_URL);

  const privateKey = HOT_WALLET_PRIVATE_KEY as string;
  const signer = new ethers.Wallet(privateKey, provider);

  const address = '<Deployed Contract Address>';
  const abi: any = [];

  const timeCapsuleNftContract = new ethers.Contract(address, abi, signer);

  const result = await timeCapsuleNftContract.mint();

  return result;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { body, method } = req;

  if (method !== 'POST') {
    res.status(405).send('Method not allowed. Use POST.');
  }

  const { twitterHandle } = body;

  try {
    if (twitterHandle && /^@?(\w){1,15}$/.test(twitterHandle)) {
      const { data } = await axios.get(
        `https://api.twitter.com/2/users/by?user.fields=profile_image_url&usernames=${twitterHandle.replace(
          '@',
          '',
        )}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
          },
        },
      );

      const profileImageUrl = data?.data[0]?.profile_image_url;

      console.log(profileImageUrl);
      // const result = await handleMint();
      // console.log(result);
      await new Promise(resolve => {
        setTimeout(resolve, 2000);
      });
      res.status(200).json({ nftAddress: '0x' });
    }
  } catch (error) {
    res.status(500).json(new Error('Internal server error'));
  }
}
