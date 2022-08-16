import { TextInput } from '@mantine/core';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { Inputs } from '../types';
import styles from '../styles/Home.module.css';

type Props = {
  error: FieldError | undefined;
  id: 'polygonAddress' | 'prediction' | 'twitterHandle' | 'captcha';
  label: string;
  placeholder: string;
  register: UseFormRegister<Inputs>;
};

export const Input = ({ error, register, placeholder, label, id }: Props) => {
  return (
    <TextInput
      className={styles['mint-input']}
      error={error && error.message}
      label={label}
      id={id}
      placeholder={placeholder}
      {...register(id)}
    />
  );
};
