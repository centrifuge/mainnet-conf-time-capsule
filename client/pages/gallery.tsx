import type { NextPage } from 'next';
import { Container, Loader } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import DOMParserReact from 'dom-parser-react';
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
    <Container px="0">
      <Container size="md" px="0" className={styles['mint-container']}>
        {isMobile ? (
          <Container px="24px" mx={0} pt="48px">
            {data.map(({ id, svg }: TimeCapsule) => (
              <DOMParserReact key={id} source={svg} />
            ))}
          </Container>
        ) : (
          data.map(({ id, svg }: TimeCapsule) => (
            <DOMParserReact key={id} source={svg} />
          ))
        )}
      </Container>
    </Container>
  );
};

export default Gallery;
