import { object, string } from 'yup';
import { ethers } from 'ethers';

const validationSchema = object().shape({
  polygonAddress: string()
    .trim()
    .required('Address is required')
    .test(function (value) {
      return ethers.utils.isAddress(value || '')
        ? true
        : this.createError({
            message: `Invalid address`,
            path: 'polygonAddress', // Fieldname
          });
    }),
  prediction: string()
    .trim()
    .max(140, 'Prediction is too long')
    .required('Prediction is required'),
  twitterHandle: string()
    .trim()
    .notRequired()
    .matches(/^@?(\w){1,15}$/, {
      excludeEmptyString: true,
      message: 'Twitter handle is invalid',
    }),
  captcha: string().matches(/^$/),
});

export default validationSchema;
