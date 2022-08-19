import type { NextPage } from 'next';
import { Container, Loader } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import styles from '../styles/Home.module.css';
import useGetTimeCapsules from '../hooks/useGetTimeCapsules';
import { TimeCapsule } from '../types';

const Gallery: NextPage = () => {
  const isMobile = useMediaQuery('(max-width: 599px)');

  const { data, isLoading } = useGetTimeCapsules();

  if (isLoading) {
    return (
      <Container className={styles['page-loader']}>
        <div className={styles.loader}>
          <Loader color="dark" size={48} />
        </div>
      </Container>
    );
  }

  return (
    <Container
      px="16px"
      style={{ maxWidth: '100%' }}
      className={styles['gallery-container']}
    >
      {isMobile ? (
        <Container px="24px" mx={0} pt="48px">
          {data.map(({ id, svgLink }: TimeCapsule) => (
            <a
              href={`https://timecapsule.centrifuge.io/capsule/${id}`}
              target="_black"
              className={styles['gallery-item']}
            >
              <img src={svgLink} alt="time-capsule" width={400} />
            </a>
          ))}
        </Container>
      ) : (
        data.map(({ id, svgLink }: TimeCapsule) => (
          <a
            href={`https://timecapsule.centrifuge.io/capsule/${id}`}
            target="_black"
            className={styles['gallery-item']}
          >
            <div>
              <img src={svgLink} alt="time-capsule" width={400} />
            </div>
          </a>
        ))
      )}
    </Container>
  );
};

export default Gallery;
