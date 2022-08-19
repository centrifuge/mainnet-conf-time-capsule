import type { NextPage } from 'next';
import { Container, Loader, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import DOMParserReact from 'dom-parser-react';
import { useRouter } from 'next/router';
import { IconBrandTwitter } from '@tabler/icons';
import { TwitterShareButton } from 'react-share';
import styles from '../../styles/Home.module.css';
import useGetTimeCapsule from '../../hooks/useGetTimeCapsule';

const Gallery: NextPage = () => {
  const isMobile = useMediaQuery('(max-width: 599px)');

  const { asPath, query } = useRouter();

  const { data, isLoading } = useGetTimeCapsule(query.id as string);

  if (isLoading) {
    return (
      <Container className={styles['page-loader']}>
        <div className={styles.loader}>
          <Loader color="dark" size={48} />
        </div>
      </Container>
    );
  }

  if (data.status === 'failed') {
    return (
      <Container className={styles['mint-failed']}>
        <Text size={18}>Mint failed! Please try again.</Text>
      </Container>
    );
  }

  if (data.status === 'minting') {
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
      {isMobile ? (
        <Container px="24px" mx={0} pt="48px">
          <DOMParserReact source={data.svg} />
        </Container>
      ) : (
        <Container className={styles['time-capsule-desktop']}>
          <DOMParserReact source={data.svg} />
          <TwitterShareButton
            title="Check out my 2023 DeFi time capsule sponsored by @centrifuge!"
            url={`https://timecapsule.centrifuge.io${asPath}`}
          >
            <IconBrandTwitter size={32} />
          </TwitterShareButton>
        </Container>
      )}
    </Container>
  );
};

export default Gallery;
