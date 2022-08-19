import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGetTimeCapsule = (id: string) => {
  const query = useQuery(
    ['time-capsule', id],
    async () => {
      const { data } = await axios.get(`/api/getTimeCapsule/${id}`);

      return data;
    },
    {
      refetchInterval: data => {
        if (data?.status === 'minted' || data === false) return false;

        return 10000;
      },
      refetchOnWindowFocus: ({ state }) => {
        if (state.data?.status === 'minted' || state.data === false)
          return false;
        return true;
      },
      enabled: !!id,
    },
  );

  return query;
};

export default useGetTimeCapsule;
