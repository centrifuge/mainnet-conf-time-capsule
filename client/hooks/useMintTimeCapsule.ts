import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type Payload = {
  polygonAddress: string;
  prediction: string;
  twitterHandle: string;
  svg: string;
};

const useMintTimeCapsule = () => {
  const query = useMutation(async (payload: Payload) => {
    const { data } = await axios.post('/api/mintTimeCapsule', payload);

    return data;
  });

  return query;
};

export default useMintTimeCapsule;
