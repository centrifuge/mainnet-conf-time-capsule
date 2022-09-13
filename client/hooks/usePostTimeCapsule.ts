import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { MintPayload } from '../types';

const usePostTimeCapsule = () => {
  const query = useMutation(async (payload: MintPayload) => {
    const { data } = await axios.post('/api/postTimeCapsule', payload);

    return data;
  });

  return query;
};

export { usePostTimeCapsule };
