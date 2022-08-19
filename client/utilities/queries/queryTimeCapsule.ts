import { request, gql } from 'graphql-request';

async function queryTimeCapsule(id: string) {
  const query = gql`
  {
    nft(id: ${id}) {
      id
      owner
    }
  }`;

  return request(
    'https://api.thegraph.com/subgraphs/name/astox/centrifuge-time-capsule',
    query,
  );
}

export default queryTimeCapsule;
