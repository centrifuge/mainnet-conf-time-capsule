import type { NextPage, NextPageContext } from 'next';
import { Container, Loader, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import cookies from 'next-cookies';
import styles from '../styles/Home.module.css';
import { useGetTimeCapsules } from '../hooks/useGetTimeCapsules';
import { useGetAdminStatus } from '../hooks/useGetAdminStatus';
import { TimeCapsule } from '../types';
import { GalleryItem } from '../components/GalleryItem';

type Props = {
  isAdmin: boolean;
};

const Gallery: NextPage<Props> = ({ isAdmin }) => {
  const isMobile = useMediaQuery('(max-width: 599px)');

  const { data, isLoading, refetch } = useGetTimeCapsules();
  const { data: isAdminData } = useGetAdminStatus(isAdmin);

  if (isLoading) {
    return (
      <>
        <Title
          align="center"
          order={isMobile ? 2 : 1}
          className={styles['gallery-title']}
        >
          Time Capsule Gallery
        </Title>
        <Container className={styles['page-loader']}>
          <div className={styles.loader}>
            <Loader color="dark" size={48} />
          </div>
        </Container>
      </>
    );
  }

  return (
    <div>
      <Title
        align="center"
        order={isMobile ? 2 : 1}
        className={styles['gallery-title']}
      >
        Centrifuge Time Capsule Gallery
      </Title>
      <Container px="16px" className={styles['gallery-container']}>
        {data?.map((timeCapsule: TimeCapsule) => (
          <GalleryItem
            key={timeCapsule.id}
            isAdmin={isAdminData}
            isMobile={isMobile}
            refetch={refetch}
            timeCapsule={timeCapsule}
          />
        ))}
      </Container>
    </div>
  );
};

const getServerSideProps = async (context: NextPageContext) => {
  const { adminPassphrase } = cookies(context);

  const isAdmin = adminPassphrase === process.env.ADMIN_PASSPHRASE;

  return {
    props: { isAdmin },
  };
};

export { getServerSideProps };
export default Gallery;
