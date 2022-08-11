import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useMintTimeCapsule from '../hooks/useMintTimeCapsule';
import styles from '../styles/Home.module.css';
import { Inputs } from '../types';
import validationSchema from '../utilities/validationSchema';

export const MintForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onSubmit',
  });

  const { mutate, data, isLoading } = useMintTimeCapsule();

  const onSubmit: SubmitHandler<Inputs> = (inputs: Inputs) => mutate(inputs);

  if (data) {
    return (
      <div className={styles.card}>
        Success! Your address is {data.nftAddress}
      </div>
    );
  }

  if (isLoading) {
    return <div className={styles.card}>Minting...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['mint-form']}>
      <div>
        <label htmlFor="polygonAddress">
          Polygon Address*
          <input
            id="polygonAddress"
            placeholder="0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
            {...register('polygonAddress')}
          />
        </label>
        {errors.polygonAddress && <span>{errors.polygonAddress.message}</span>}
      </div>

      <div>
        <label htmlFor="twitterHandle">
          Twitter Handle
          <input
            id="twitterHandle"
            placeholder="@elon_musk"
            {...register('twitterHandle')}
          />
        </label>
        {errors.twitterHandle && <span>{errors.twitterHandle.message}</span>}
      </div>

      <div>
        <label htmlFor="prediction">
          Your 2023 DeFi Prediction*
          <textarea
            id="prediction"
            placeholder="In 2023..."
            {...register('prediction')}
          />
        </label>
        {errors.prediction && <span>{errors.prediction.message}</span>}
      </div>

      <div className={styles.captcha}>
        <input {...register('captcha')} />
      </div>

      <button type="submit">Mint NFT</button>
    </form>
  );
};
