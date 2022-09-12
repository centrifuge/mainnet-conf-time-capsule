import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TimeCapsule } from '../types';

const useGetTimeCapsules = () => {
  const query = useQuery(
    ['time-capsules'],
    async () => {
      const { data } = await axios.get('/api/getTimeCapsules');

      if (data.length) {
        data.sort(
          (a: TimeCapsule, b: TimeCapsule) => b.timestamp - a.timestamp,
        );

        return data;
      }

      return [];
    },
    {
      refetchInterval: 15000,
    },
  );

  return query;
};

export { useGetTimeCapsules };
