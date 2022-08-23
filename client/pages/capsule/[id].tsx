import { useMemo, useState } from 'react';
import type { NextPage } from 'next';
import {
  Anchor,
  Container,
  Loader,
  Skeleton,
  Space,
  Text,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { IconBrandTwitter, IconExternalLink } from '@tabler/icons';
import { TwitterShareButton } from 'react-share';
import styles from '../../styles/Home.module.css';
import useGetTimeCapsule from '../../hooks/useGetTimeCapsule';

const { NETWORK } = process.env;

const Gallery: NextPage = () => {
  const isMobile = useMediaQuery('(max-width: 599px)');
  const [imageLoaded, setImageLoaded] = useState(false);

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

  if (data?.status === 'pending' || data?.status === 'minted') {
    return (
      <Container className={styles['time-capsule']}>
        <div className={styles.loader}>
          <img
            onLoad={() => setImageLoaded(true)}
            src={data.svgLink}
            alt="time capsule"
          />
          {!imageLoaded && (
            <Skeleton
              height={isMobile ? 168.75 : 337.5}
              width={isMobile ? 300 : 600}
            />
          )}
          <div className={styles['time-capsule-footer']}>
            <div className={styles['share-button']}>
              <TwitterShareButton
                title="Check out my 2023 DeFi time capsule sponsored by @centrifuge!"
                url={data.svgLink}
              >
                <Text>Share on Twitter</Text>
                <IconBrandTwitter size={isMobile ? 24 : 32} />
              </TwitterShareButton>
            </div>
            <div>
              {data.status === 'pending' ? (
                <div className={styles['transaction-info']}>
                  <div className={styles.minting}>
                    <Loader color="dark" size={24} />
                    <Space w={4} /> <Text>Minting...</Text>
                  </div>
                  <div className={styles.transaction}>
                    <Text align="end">This may take a few minutes.</Text>
                    <Space w={4} />
                    <Text align="end">
                      View{' '}
                      <Text
                        variant="link"
                        component="a"
                        href={`${explorerUrl}/tx/${data.hash}`}
                        target="_blank"
                      >
                        transaction
                      </Text>
                      .
                    </Text>
                  </div>
                </div>
              ) : (
                <Anchor
                  className={styles['transaction-link']}
                  href={`${explorerUrl}/tx/${data.hash}`}
                  target="_blank"
                  color="dark"
                >
                  <Text>View Transaction</Text>
                  <IconExternalLink size={isMobile ? 24 : 32} />
                </Anchor>
              )}
            </div>
          </div>
        </div>
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
