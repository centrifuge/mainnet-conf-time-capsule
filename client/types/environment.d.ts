/* eslint-disable no-unused-vars */
declare namespace NodeJS {
  interface ProcessEnv {
    GCP_PRIVATE_KEY: string;
    GCP_CLIENT_EMAIL: string;
    GCP_PROJECT_ID: string;
    NEXT_PUBLIC_NETWORK: string;
  }
}
