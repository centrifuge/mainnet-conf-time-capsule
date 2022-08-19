import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Card, Container, Loader, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { MintForm } from '../components/MintForm';
import styles from '../styles/Home.module.css';
import useMintTimeCapsule from '../hooks/useMintTimeCapsule';

const Home: NextPage = () => {
  const isMobile = useMediaQuery('(max-width: 599px)');
  const { mutate, data, isLoading, isSuccess } = useMintTimeCapsule();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push(`/capsule/${data.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  if (isLoading || isSuccess) {
    return (
      <Container className={styles['page-loader']}>
        <div className={styles.loader}>
          <Loader color="dark" size={48} />
          <Text>Minting...</Text>
        </div>
      </Container>
    );
  }

  return (
    <Container px="0">
      <Container size="md" px="0" className={styles['mint-container']}>
        {isMobile ? (
          <Container px="24px" mx={0} pt="48px">
            <MintForm mint={mutate} />
          </Container>
        ) : (
          <Card shadow="md" className={styles['mint-card']}>
            <MintForm mint={mutate} />
          </Card>
        )}
      </Container>
    </Container>
  );
};

export default Home;
