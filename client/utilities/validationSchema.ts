import { object, string } from 'yup';

const validationSchema = object().shape({
  polygonAddress: string().required('Address is required'),
  prediction: string().required('Prediction is required'),
  twitterHandle: string(),
  captcha: string().matches(/^$/),
});

export default validationSchema;
