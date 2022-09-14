import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { parse } from 'cookie';

const useGetAdminStatus = (isAdmin: boolean) => {
  const adminPassphrase =
    (typeof document === 'object' && parse(document.cookie)?.adminPassphrase) ||
    '';

  const query = useQuery(
    ['admin-status'],
    async () => {
      const { data } = await axios.get('/api/getAdminStatus', {
        headers: {
          'admin-passphrase': adminPassphrase,
        },
      });

      return data;
    },
    { initialData: isAdmin },
  );

  return query;
};

export { useGetAdminStatus };
