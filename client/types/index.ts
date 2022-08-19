import validationSchema from '../utilities/validationSchema';

export type Inputs = {
  polygonAddress: string;
  prediction: string;
  twitterHandle: string;
  captcha: string;
};

export type ValidationSchema = typeof validationSchema;

export type TimeCapsule = {
  id: string;
  twitterHandle: string;
  prediction: string;
  polygonAddress: string;
  svg: string;
  hash: string;
  svgLink: string;
};

export type MintPayload = {
  polygonAddress: string;
  prediction: string;
  twitterHandle: string;
  svg: string;
};
