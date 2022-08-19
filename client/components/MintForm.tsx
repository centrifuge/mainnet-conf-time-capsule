import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UseMutateFunction } from '@tanstack/react-query';
import { Button, Stack, Text, Textarea, TextInput } from '@mantine/core';
import generateSVG from '../utilities/generateSVG';
import { Inputs, MintPayload } from '../types';
import validationSchema from '../utilities/validationSchema';
import styles from '../styles/Home.module.css';

type Props = {
  mint: UseMutateFunction<any, unknown, MintPayload, unknown>;
};

export const MintForm = ({ mint }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (inputs: Inputs) => {
    const svg = generateSVG(inputs.prediction, inputs.twitterHandle, 400, 400);

    return mint({
      polygonAddress: inputs.polygonAddress,
      prediction: inputs.prediction,
      twitterHandle: inputs.twitterHandle,
      svg,
    });
  };

  const predictionLength = watch('prediction')?.length || 0;

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
            color={predictionLength > 140 ? 'red' : 'dark'}
          >
            {predictionLength}/140
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
