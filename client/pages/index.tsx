import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Card, Container, Loader, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { MintForm } from '../components/MintForm';
import styles from '../styles/Home.module.css';
import { usePostTimeCapsule } from '../hooks/usePostTimeCapsule';

const Home: NextPage = () => {
  const isMobile = useMediaQuery('(max-width: 599px)');
  const { mutate, data, isLoading, isSuccess, isError } = usePostTimeCapsule();
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
        </div>
      </Container>
    );
  }

  return (
    <Container px="0">
      <Container size="md" px="0" className={styles['mint-container']}>
        {isMobile ? (
          <Container px="24px" mx={0} pt="48px">
            <Container pb={32}>
              <Title order={2} align="center">
                Centrifuge Time Capsule
              </Title>
              <Title order={6} align="center" weight={300}>
                Turn your 2023 DeFi prediction into a personalized NFT
              </Title>
            </Container>
            <MintForm mint={mutate} isError={isError} />
          </Container>
        ) : (
          <Card shadow="md" className={styles['mint-card']} py={42} px={48}>
            <Container pb={32}>
              <Title order={1} align="center">
                Centrifuge Time Capsule
              </Title>
              <Title order={4} align="center" weight={300}>
                Turn your 2023 DeFi prediction into a personalized NFT
              </Title>
            </Container>
            <MintForm mint={mutate} isError={isError} />
          </Card>
        )}
      </Container>
    </Container>
  );
};

export default Home;
