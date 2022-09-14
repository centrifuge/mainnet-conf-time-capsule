import { Handler } from '@netlify/functions';

const handler: Handler = async event => {
  try {
    const { ADMIN_PASSPHRASE } = process.env;

    const { httpMethod, headers } = event;

    if (httpMethod !== 'GET') {
      return {
        statusCode: 405,
        body: 'Method not allowed. Use GET.',
      };
    }
    if (headers['admin-passphrase'] !== ADMIN_PASSPHRASE) {
      return {
        statusCode: 401,
        body: 'Unauthorized',
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(headers['admin-passphrase'] === ADMIN_PASSPHRASE),
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        statusCode: 500,
        body: JSON.stringify(error?.message),
      };
    }

    return {
      statusCode: 500,
      body: 'Something went wrong!',
    };
  }
};

export { handler };
