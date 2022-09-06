import { useMemo } from 'react';
import type { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { Anchor, Container, Loader, Space, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { IconBrandTwitter, IconExternalLink } from '@tabler/icons';
import { TwitterShareButton } from 'react-share';
import styles from '../../styles/Home.module.css';
import useGetTimeCapsule from '../../hooks/useGetTimeCapsule';
import getTimeCapsuleFromBucket from '../../utilities/db/getTimeCapsuleFromBucket';
import getTimeCapsuleFromFirestore from '../../utilities/db/getTimeCapsuleFromFirestore';
import queryTimeCapsule from '../../utilities/queries/queryTimeCapsule';

const { NETWORK } = process.env;

type Props =
  | {
      pngLink: string;
      hash: string;
      status: 'pending' | 'minted';
      svgLink: string;
    }
  | Record<string, never>;

const Capsule: NextPage = ({ pngLink, hash, status, svgLink }: Props) => {
  const isMobile = useMediaQuery('(max-width: 599px)');

  const { query } = useRouter();

  const { data } = useGetTimeCapsule({
    id: query.id as string,
    pngLink,
    hash,
    status,
    svgLink,
  });

  const explorerUrl = useMemo(
    () =>
      NETWORK === 'mainnet'
        ? 'https://polygonscan.com'
        : 'https://mumbai.polygonscan.com',
    [],
  );

  if (!data.status) {
    return (
      <Container className={styles['page-loader']}>
        <div className={styles.loader}>
          <Text>Not found</Text>
        </div>
      </Container>
    );
  }

  if (data.status === 'pending' || data.status === 'minted') {
    return (
      <>
        <Head>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Centrifuge Time Capsule" />
          <meta
            name="twitter:description"
            content="Here's my 2023 DeFi prediction. What's yours? https://timecapsule.centrifuge.io"
          />
          <meta name="twitter:image" content={data.pngLink} />
          <meta name="twitter:site" content="@centrifuge" />
        </Head>

        <Container className={styles['time-capsule']}>
          <div className={styles.loader}>
            <img src={data.svgLink} alt="time capsule" />
            <div className={styles['time-capsule-footer']}>
              <div className={styles['share-button']}>
                <TwitterShareButton
                  title={`Here's my 2023 DeFi Prediction. What's yours? https://timecapsule.centrifuge.io #CentrifugeTimeCapsule @centrifuge`}
                  url={`https://timecapsule.centrifuge.io/capsule/${query.id}`}
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
      </>
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

export async function getServerSideProps(context: NextPageContext) {
  const { nft } = await queryTimeCapsule(context.query.id as string);

  const imageLinks = await getTimeCapsuleFromBucket(context.query.id as string);

  const metadata = await getTimeCapsuleFromFirestore(
    context.query.id as string,
  );

  if (nft && imageLinks && metadata) {
    return {
      props: {
        status: 'minted',
        svgLink: imageLinks.svgLink,
        pngLink: imageLinks.pngLink,
        hash: metadata.hash,
      },
    };
  }

  if (imageLinks && metadata) {
    return {
      props: {
        status: 'pending',
        hash: metadata.hash,
        svgLink: imageLinks.svgLink,
        pngLink: imageLinks.pngLink,
      },
    };
  }

  return { props: {} };
}

export default Capsule;
