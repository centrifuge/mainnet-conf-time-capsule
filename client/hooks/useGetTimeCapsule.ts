import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Status } from '../types';

const useGetTimeCapsule = (config: {
  id: string;
  status: Status;
  hash: string;
  svgLink: string;
  pngLink: string;
}) => {
  const query = useQuery(
    ['time-capsule', config.id],
    async () => {
      if (config.status === 'not found') {
        return { status: 'not found' };
      }

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
