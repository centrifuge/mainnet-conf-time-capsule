import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TimeCapsule } from '../types';

const useGetTimeCapsules = () => {
  const query = useQuery(
    ['time-capsules'],
    async () => {
      const { data } = await axios.get('/api/getTimeCapsules');

      return data.filter(
        (timeCapsule: TimeCapsule) => timeCapsule.status === 'minted',
      );
    },
    {
      refetchInterval: 30000,
    },
  );

  return query;
};

export default useGetTimeCapsules;
