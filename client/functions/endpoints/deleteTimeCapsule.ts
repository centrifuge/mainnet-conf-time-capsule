import { Handler } from '@netlify/functions';
import { deleteTimeCapsulesFromBucket } from '../helpers/deleteTimeCapsulesFromBucket';
import { deleteTimeCapsulesFromFirestore } from '../helpers/deleteTimeCapsulesFromFirestore';

const handler: Handler = async event => {
  const { ADMIN_PASSPHRASE } = process.env;

  const { httpMethod, headers } = event;

  if (httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      body: 'Method not allowed. Use DELETE.',
    };
  }

  const { id } = JSON.parse(event.body || '');

  if (headers['admin-passphrase'] !== ADMIN_PASSPHRASE) {
    return {
      statusCode: 401,
      body: 'Unauthorized',
    };
  }

  try {
    await deleteTimeCapsulesFromBucket(id);
    await deleteTimeCapsulesFromFirestore(id);

    return {
      statusCode: 200,
      body: JSON.stringify(`Successfully deleted ${id}`),
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
