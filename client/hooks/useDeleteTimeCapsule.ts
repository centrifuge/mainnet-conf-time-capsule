import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { parse } from 'cookie';

const useDeleteTimeCapsule = () => {
  const adminPassphrase =
    (typeof document === 'object' && parse(document.cookie)?.adminPassphrase) ||
    '';

  const query = useMutation(async (id: string) => {
    const { data } = await axios.delete('/api/deleteTimeCapsule', {
      headers: { 'admin-passphrase': adminPassphrase },
      data: { id },
    });

    return data;
  });

  return query;
};

export { useDeleteTimeCapsule };
