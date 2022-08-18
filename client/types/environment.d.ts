/* eslint-disable no-unused-vars */
declare namespace NodeJS {
  interface ProcessEnv {
    GCP_PRIVATE_KEY: string;
    GCP_CLIENT_EMAIL: string;
    GCP_PROJECT_ID: string;
    HOT_WALLET_PRIVATE_KEY: string;
    NETWORK: string;
    INFURA_RPC_URL: string;
  }
}
