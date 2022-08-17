import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Loader, Stack, Text, TextInput } from '@mantine/core';
import useMintTimeCapsule from '../hooks/useMintTimeCapsule';
import SVGgenerator from '../hooks/SVGGenerator';
import { Inputs } from '../types';
import validationSchema from '../utilities/validationSchema';
import { Input } from './Input';
import styles from '../styles/Home.module.css';

const { NETWORK } = process.env;

export const MintForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  const { mutate, data, isLoading } = useMintTimeCapsule();

  const onSubmit: SubmitHandler<Inputs> = (inputs: Inputs) => {
    console.log(
      SVGgenerator(inputs.prediction, inputs.twitterHandle, 400, 400),
    );
    return mutate({
      polygonAddress: inputs.polygonAddress,
      prediction: inputs.prediction,
      twitterHandle: inputs.twitterHandle,
    });
  };

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
        <Input
          label="Polygon Address"
          id="polygonAddress"
          register={register}
          error={errors.polygonAddress}
          placeholder="0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
        />
        <Input
          label="Twitter Handle"
          id="twitterHandle"
          register={register}
          error={errors.twitterHandle}
          placeholder="@elon_musk"
        />
        <Input
          label="Your 2023 DeFi Prediction"
          id="prediction"
          register={register}
          error={errors.prediction}
          placeholder="In 2023..."
        />
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
