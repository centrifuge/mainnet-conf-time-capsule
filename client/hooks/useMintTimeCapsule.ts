import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { MintPayload } from '../types';

const useMintTimeCapsule = () => {
  const query = useMutation(async (payload: MintPayload) => {
    const { data } = await axios.post('/api/mintTimeCapsule', payload);

    return data;
  });

  return query;
};

export { useMintTimeCapsule };
