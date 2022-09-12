import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import shuffle from 'lodash/shuffle';

const useGetShowcase = () => {
  const query = useQuery(
    ['time-capsules'],
    async () => {
      const { data } = await axios.get('/api/getTimeCapsules');

      if (data.length) {
        return shuffle(data).slice(0, 9);
      }

      return [];
    },
    {
      refetchInterval: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  );

  return query;
};

export { useGetShowcase };
