import { request, gql } from 'graphql-request';

async function queryTimeCapsules() {
  const query = gql`
    {
      nfts(first: 1000) {
        id
        owner
      }
    }
  `;

  return request(
    'https://api.thegraph.com/subgraphs/name/astox/centrifuge-time-capsule',
    query,
  );
}

export default queryTimeCapsules;
