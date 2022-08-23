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
   GCP_CLIENT_EMAIL=<google-cloud-service-account-email-address>
   GCP_PRIVATE_KEY=<google-cloud-service-account-private-key>
   GCP_PROJECT_ID=<google-cloud-project-id>
   MINT_CONTRACT_ADDRESS=<contract-address>
   NETWORK=<network>
   ```

4. Run a local development environment

```sh
$ yarn dev
```

#### API Spec

| Type   | Endpoint                  | Body                                                                                                     | Response                                                                                                                                                                           |
| ------ | ------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/mintTimeCapsule`    | <pre>{<br /> twitterHandle: string;<br /> polygonAddress: string;<br /> prediction: string;<br />}</pre> | <pre>{<br /> hash: string;<br /> id: string;<br />}<br />&vert;<br />string<br />&vert;<br />Error</pre>                                                                         |
| `GET`  | `/api/getTimeCapsules`    | `--`                                                                                                     | <pre>{<br /> id: string;<br /> svgLink: string;<br /> timestamp: number;<br />}[]<br />&vert;<br />string<br />&vert;<br />Error</pre>                                           |
| `GET`  | `/api/getTimeCapsule/:id` | `--`                                                                                                     | <pre>{<br /> status: 'minted' &vert; 'pending';<br /> svgLink: string;<br /> hash: string;<br />}<br />&vert;<br />boolean<br />&vert;<br />string<br />&vert;<br />Error</pre> |
