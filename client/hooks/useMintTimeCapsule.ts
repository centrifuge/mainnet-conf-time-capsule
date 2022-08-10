import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Inputs } from '../types';

const useMintTimeCapsule = () => {
  const query = useMutation(async (payload: Inputs) => {
    const { data } = await axios.post('/api/mintTimeCapsule', payload);

    return data;
  });

  return query;
};

export default useMintTimeCapsule;
