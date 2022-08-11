import { object, string } from 'yup';
import { ethers } from 'ethers';
import axios from 'axios';

const validationSchema = object().shape({
  polygonAddress: string()
    .trim()
    .required('Address is required')
    .test(value => ethers.utils.isAddress(value || '')),
  prediction: string()
    .trim()
    .max(200, 'Prediction is too long')
    .required('Prediction is required'),
  twitterHandle: string()
    .trim()
    .matches(/^@?(\w){1,15}$/, 'Twitter handle is invalid')
    .test('checkIfExists', 'Twitter handle does not exist', async value => {
      const { data } = await axios.get('/api/getTwitterUser', {
        params: { twitterHandle: value },
      });

      return data.isValidUser;
    }),
  captcha: string().matches(/^$/),
});

export default validationSchema;
