import type { NextPage } from 'next';
import Head from 'next/head';
import { useForm, SubmitHandler } from 'react-hook-form';
import useMintTimeCapsule from '../hooks/useMintTimeCapsule';
import styles from '../styles/Home.module.css';
import { Inputs } from '../types';

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

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
    <div className={styles.container}>
      <Head>
        <title>Centrifuge Time Capsule</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.card}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles['mint-form']}>
          <div>
            <label htmlFor="maticAddress">
              Polygon Address*
              <input
                id="maticAddress"
                placeholder="0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
                {...register('maticAddress', { required: true })}
              />
            </label>
            {errors.maticAddress && <span>This field is required</span>}
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
          </div>

          <div>
            <label htmlFor="prediction">
              Your 2023 DeFi Prediction*
              <textarea
                id="prediction"
                placeholder="In 2023..."
                {...register('prediction', { required: true })}
              />
            </label>
            {errors.prediction && <span>This field is required</span>}
          </div>

          <button type="submit">Mint NFT</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
