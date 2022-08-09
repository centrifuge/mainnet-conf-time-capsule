type Inputs = {
  maticAddress: string;
  prediction: string;
  twitterHandle: string;
};

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
};
