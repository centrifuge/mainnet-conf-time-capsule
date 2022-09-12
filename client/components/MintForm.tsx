import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UseMutateFunction } from '@tanstack/react-query';
import {
  Button,
  Center,
  Stack,
  Text,
  Textarea,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons';
import { Inputs, MintPayload } from '../types';
import { validationSchema } from '../utilities/validationSchema';
import styles from '../styles/Home.module.css';

type Props = {
  mint: UseMutateFunction<unknown, unknown, MintPayload, unknown>;
  isError: boolean;
};

const InputToolTip = ({ text }: { text: string }) => (
  <Tooltip
    multiline
    label={text}
    position="top-end"
    withArrow
    transition="pop-bottom-right"
    width={220}
    style={{ wordBreak: 'break-word' }}
  >
    <Text color="dimmed" sx={{ cursor: 'help' }}>
      <Center>
        <IconInfoCircle size={18} stroke={1.5} />
      </Center>
    </Text>
  </Tooltip>
);

const MintForm = ({ mint, isError }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (inputs: Inputs) =>
    mint({
      polygonAddress: inputs.polygonAddress,
      prediction: inputs.prediction,
      twitterHandle: inputs.twitterHandle,
    });

  const predictionLength = watch('prediction')?.length || 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['mint-form']}>
      <Stack spacing={8}>
        <div>
          <Textarea
            className={styles['mint-input']}
            error={errors.prediction && errors.prediction.message}
            label="Your 2023 DeFi Prediction"
            id="prediction"
            placeholder="In 2023..."
            withAsterisk
            rightSection={
              <InputToolTip text="What do you predict will happen in the DeFi space in 2023?" />
            }
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

        <TextInput
          spellCheck={false}
          className={styles['mint-input']}
          error={errors.twitterHandle && errors.twitterHandle.message}
          label="Twitter Handle"
          id="twitterHandle"
          placeholder="@satoshi_nakamoto"
          style={{ paddingBottom: '16px' }}
          rightSection={
            <InputToolTip text="(Optional) - Your Twitter handle will be included in the NFT image. If left blank, 'anonymous' will be displayed on the NFT." />
          }
          {...register('twitterHandle')}
        />

        <TextInput
          spellCheck={false}
          className={styles['mint-input']}
          error={errors.polygonAddress && errors.polygonAddress.message}
          label="Polygon Address"
          id="polygonAddress"
          placeholder="0x..."
          style={{ paddingBottom: '16px' }}
          rightSection={
            <InputToolTip text="(Optional) - Enter a valid Polygon address to have the NFT sent to your wallet. If left blank, the NFT will mint to 0xdd36963FD066DB172ea360f5045506bc25b423Fb." />
          }
          {...register('polygonAddress')}
        />

        <div className={styles.captcha}>
          <TextInput {...register('captcha')} />
        </div>
        <div className={styles['mint-button']}>
          <Button type="submit" color="dark">
            Mint NFT
          </Button>
          {isError && (
            <Text color="red" size="sm">
              Something went wrong! Please try again.
            </Text>
          )}
        </div>
      </Stack>
    </form>
  );
};

export { MintForm };
