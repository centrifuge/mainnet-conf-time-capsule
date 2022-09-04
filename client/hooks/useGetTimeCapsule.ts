import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGetTimeCapsule = (config: {
  id?: string;
  status?: 'pending' | 'minted';
  hash?: string;
  svgLink?: string;
  pngLink?: string;
}) => {
  const query = useQuery(
    ['time-capsule', config.id],
    async () => {
      const { data } = await axios.get(`/api/getTimeCapsule/${config.id}`);

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
      initialData: config,
      enabled: !!config.hash,
    },
  );

  return query;
};

export default useGetTimeCapsule;
