import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Loader,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import useMintTimeCapsule from '../hooks/useMintTimeCapsule';
import generateSVG from '../utilities/generateSVG';
import { Inputs } from '../types';
import validationSchema from '../utilities/validationSchema';
import styles from '../styles/Home.module.css';

const { NETWORK } = process.env;

export const MintForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  const { mutate, data, isLoading } = useMintTimeCapsule();

  const onSubmit: SubmitHandler<Inputs> = (inputs: Inputs) => {
    const svg = generateSVG(inputs.prediction, inputs.twitterHandle, 400, 400);

    return mutate({
      polygonAddress: inputs.polygonAddress,
      prediction: inputs.prediction,
      twitterHandle: inputs.twitterHandle,
      svg,
    });
  };

  const predictionLength = watch('prediction')?.length || 0;

  const explorerUrl = useMemo(
    () =>
      NETWORK === 'mainnet'
        ? 'https://polygonscan.com'
        : 'https://mumbai.polygonscan.com',
    [],
  );

  if (data) {
    return (
      <div className={styles.success}>
        <Text span align="center">
          Successfully submitted! See your
          <span style={{ marginLeft: '4px' }} />
          <Text
            span
            variant="link"
            component="a"
            href={`${explorerUrl}/tx/${data.hash}`}
            target="_blank"
          >
            transaction
          </Text>
          <Text span>.</Text>
        </Text>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <Loader color="dark" />
        <Text>Minting...</Text>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['mint-form']}>
      <Stack spacing={24}>
        <TextInput
          className={styles['mint-input']}
          error={errors.polygonAddress && errors.polygonAddress.message}
          label="Polygon Address"
          id="polygonAddress"
          placeholder="0x..."
          {...register('polygonAddress')}
        />

        <TextInput
          className={styles['mint-input']}
          error={errors.twitterHandle && errors.twitterHandle.message}
          label="Twitter Handle"
          id="twitterHandle"
          placeholder="@satoshi_nakamoto"
          {...register('twitterHandle')}
        />

        <div>
          <Textarea
            className={styles['mint-input']}
            error={errors.prediction && errors.prediction.message}
            label="Your 2023 DeFi Prediction"
            id="prediction"
            placeholder="In 2023..."
            {...register('prediction')}
          />

          <Text
            size={12}
            align="end"
            color={predictionLength > 200 ? 'red' : 'dark'}
          >
            {predictionLength}/200
          </Text>
        </div>
        <div className={styles.captcha}>
          <TextInput {...register('captcha')} />
        </div>
        <div className={styles['mint-button']}>
          <Button type="submit" color="dark">
            Mint NFT
          </Button>
        </div>
      </Stack>
    </form>
  );
};
