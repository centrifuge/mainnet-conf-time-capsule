## Time Capsule UI

#### Prerequisites

- node
- yarn

#### Installation

1. Clone the repo

   ```sh
   $ git clone git@github.com:centrifuge/mainnet-conf-time-capsule.git
   ```

2. Install packages

   ```sh
   $ yarn install
   ```

3. Enter environment variables in `.env`

   ```sh
   INFURA_RPC_URL==<infura-rpc-url>
   HOT_WALLET_PRIVATE_KEY=<private-key>
   TWITTER_BEARER_TOKEN=<twitter-bearer-token>
   ```

4. Run a local development environment

   ```sh
   $ yarn dev
   ```

#### API Spec

| Type   | Endpoint                                             | Body                                                                         | Response                         |
| ------ | ---------------------------------------------------- | ---------------------------------------------------------------------------- | -------------------------------- |
| `POST` | `/api/mintTimeCapsule`                               | `{ twitterHandle: string; polygonAddress: string; defiPrediction: string; }` | `{ timeCapsuleAddess: string; }` |
| `GET`  | `/api/getTwitterUser?twitterHandle=<twitter-handle>` | --                                                                           | `{ isValidUser: boolean; }`      |
