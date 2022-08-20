import type { NextPage } from 'next';
import { Container, Loader, Title } from '@mantine/core';
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
    <div>
      <Title
        align="center"
        order={isMobile ? 2 : 1}
        className={styles['gallery-title']}
      >
        Time Capsule Gallery
      </Title>
      <Container px="16px" className={styles['gallery-container']}>
        {data.map(({ id, svgLink }: TimeCapsule) => (
          <div>
            <a
              href={`https://timecapsule.centrifuge.io/capsule/${id}`}
              target="_black"
              className={styles['gallery-item']}
            >
              <div>
                <img
                  src={svgLink}
                  alt="time-capsule"
                  width={isMobile ? 300 : 400}
                />
              </div>
            </a>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Gallery;
