import { Handler } from '@netlify/functions';
import { getTimeCapsulesFromFirestore } from '../helpers/getTimeCapsulesFromFirestore';
import { getTimeCapsulesFromBucket } from '../helpers/getTimeCapsulesFromBucket';

const handler: Handler = async event => {
  const { httpMethod } = event;

  if (httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: 'Method not allowed. Use GET.',
    };
  }

  try {
    const timeCapsulesFromBucket = await getTimeCapsulesFromBucket();

    const timeCapsulesFromFirestore = await getTimeCapsulesFromFirestore();

    const mintedTimeCapsules = timeCapsulesFromFirestore.filter(
      timeCapsule =>
        timeCapsule.status === 'minted' &&
        timeCapsulesFromBucket[timeCapsule.id],
    );

    return {
      statusCode: 200,
      body: JSON.stringify(mintedTimeCapsules),
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    }

    return {
      statusCode: 500,
      body: 'Something went wrong!',
    };
  }
};

export { handler };
