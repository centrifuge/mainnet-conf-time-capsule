import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGetTimeCapsules = (id: string) => {
  const query = useQuery(['time-capsule', id], async () => {
    const { data } = await axios.get(`/api/getTimeCapsule/${id}`);

    return data;
  });

  return query;
};

export default useGetTimeCapsules;
