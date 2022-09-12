import { validationSchema } from '../utilities/validationSchema';

export type Status = 'failed' | 'minted' | 'not found' | 'pending' | 'queued';

export type Inputs = {
  polygonAddress: string;
  prediction: string;
  twitterHandle: string;
  captcha: string;
};

export type ValidationSchema = typeof validationSchema;

export type TimeCapsule = {
  id: string;
  svgLink: string;
  timestamp: number;
  status: Status;
};

export type MintPayload = {
  polygonAddress: string;
  prediction: string;
  twitterHandle: string;
};

export interface FirestoreEntry extends TimeCapsule {
  polygonAddress: string;
  svg: string;
  hash: string;
  pngLink: string;
}
