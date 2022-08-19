import { useMemo } from 'react';
import type { NextPage } from 'next';
import { Container, Loader, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { IconBrandTwitter } from '@tabler/icons';
import { TwitterShareButton } from 'react-share';
import styles from '../../styles/Home.module.css';
import useGetTimeCapsule from '../../hooks/useGetTimeCapsule';

const { NETWORK } = process.env;

const Gallery: NextPage = () => {
  const isMobile = useMediaQuery('(max-width: 599px)');

  const { query } = useRouter();

  const { data, isLoading } = useGetTimeCapsule(query.id as string);

  const explorerUrl = useMemo(
    () =>
      NETWORK === 'mainnet'
        ? 'https://polygonscan.com'
        : 'https://mumbai.polygonscan.com',
    [],
  );

  if (isLoading) {
    return (
      <Container className={styles['page-loader']}>
        <div className={styles.loader}>
          <Loader color="dark" size={48} />
        </div>
      </Container>
    );
  }

  if (data === false) {
    return (
      <Container className={styles['page-loader']}>
        <div className={styles.loader}>
          <Text>Not found</Text>
        </div>
      </Container>
    );
  }

  if (data?.status === 'pending') {
    return (
      <Container className={styles['page-loader']}>
        <div className={styles.loader}>
          <Loader color="dark" size={48} />
          <Text>Minting...</Text>
          <Text>This may take a few minutes.</Text>
          <Text>
            Track the{' '}
            <Text
              variant="link"
              component="a"
              href={`${explorerUrl}/tx/${data.hash}`}
              target="_blank"
            >
              transaction.
            </Text>
          </Text>
        </div>
      </Container>
    );
  }

  if (data?.status === 'minted') {
    return (
      <Container px="0">
        <Container className={styles['time-capsule']}>
          <img src={data.svgLink} alt="time capsule" />
          <TwitterShareButton
            title="Check out my 2023 DeFi time capsule sponsored by @centrifuge!"
            url={data.svgLink}
          >
            <IconBrandTwitter size={isMobile ? 24 : 32} />
          </TwitterShareButton>
        </Container>
      </Container>
    );
  }

  return (
    <Container className={styles['page-loader']}>
      <div className={styles.loader}>
        <Text>Something went wrong.</Text>
      </div>
    </Container>
  );
};

export default Gallery;
