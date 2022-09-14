import { useEffect, useState } from 'react';
import { Button, Loader } from '@mantine/core';
import { IconTrash } from '@tabler/icons';
import { useDeleteTimeCapsule } from '../hooks/useDeleteTimeCapsule';
import styles from '../styles/Home.module.css';

type Props = {
  id: string;
  onSuccess: () => void;
};

const DeleteArea = ({ id, onSuccess }: Props) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { mutate, isLoading, isSuccess } = useDeleteTimeCapsule();

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  useEffect(() => {
    if (isLoading) {
      setIsDeleting(true);
    }

    if (!isLoading && !onSuccess) {
      setIsDeleting(false);
    }
  }, [isLoading, onSuccess]);

  if (isDeleting) {
    return <Loader color="red" size="sm" />;
  }

  if (confirmDelete) {
    return (
      <div className={styles['gallery-delete-buttons']}>
        <Button color="red" onClick={() => setConfirmDelete(false)}>
          Cancel
        </Button>
        <Button color="red" onClick={() => mutate(id)}>
          Confirm
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button color="red" onClick={() => setConfirmDelete(true)}>
        <IconTrash size={18} />
      </Button>
    </div>
  );
};

export { DeleteArea };
