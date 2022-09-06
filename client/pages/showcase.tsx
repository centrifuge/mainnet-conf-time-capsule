import type { NextPage } from 'next';
import { Container, Loader, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/Home.module.css';
import useGetShowcase from '../hooks/useGetShowcase';
import { TimeCapsule } from '../types';

const Showcase: NextPage = () => {
  const isMobile = useMediaQuery('(max-width: 599px)');

  const { data, isLoading } = useGetShowcase();

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
      <AnimatePresence>
        <Container px="16px" className={styles['gallery-container']}>
          {data?.map(({ id, svgLink }: TimeCapsule) => (
            <motion.div
              key={id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            >
              <a
                href={`/capsule/${id}`}
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
            </motion.div>
          ))}
        </Container>
      </AnimatePresence>
    </div>
  );
};

export default Showcase;
