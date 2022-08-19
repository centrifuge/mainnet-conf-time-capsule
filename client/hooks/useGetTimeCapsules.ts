import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGetTimeCapsules = () => {
  const query = useQuery(
    ['time-capsules'],
    async () => {
      const { data } = await axios.get('/api/getTimeCapsules');

      return data;
    },
    {
      refetchInterval: 30000,
    },
  );

  return query;
};

export default useGetTimeCapsules;
