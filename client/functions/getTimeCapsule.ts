import { Handler } from '@netlify/functions';
import { getTimeCapsuleFromBucket } from '../utilities/db/getTimeCapsuleFromBucket';
import { getTimeCapsuleFromFirestore } from '../utilities/db/getTimeCapsuleFromFirestore';

const handler: Handler = async event => {
  const { httpMethod, queryStringParameters } = event;

  if (httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: 'Method not allowed. Use GET.',
    };
  }

  if (!queryStringParameters?.id) {
    return {
      statusCode: 400,
      body: 'Pass an NFT id',
    };
  }

  try {
    const imageLinks = await getTimeCapsuleFromBucket(
      queryStringParameters?.id,
    );

    const metadata = await getTimeCapsuleFromFirestore(
      queryStringParameters.id,
    );

    if (imageLinks && metadata) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          status: metadata.status,
          svgLink: imageLinks.svgLink,
          pngLink: imageLinks.pngLink,
          hash: metadata.hash,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(false),
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
