import { object, string } from 'yup';
import { ethers } from 'ethers';

const validationSchema = object().shape({
  polygonAddress: string()
    .trim()
    .transform(value =>
      value === '' ? '0xdd36963FD066DB172ea360f5045506bc25b423Fb' : value,
    )
    .test(function (value) {
      return ethers.utils.isAddress(value || '')
        ? true
        : this.createError({
            message: 'Invalid address',
            path: 'polygonAddress',
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
