import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  AppShell,
  createStyles,
  Burger,
  Container,
  Group,
  Header,
  MantineProvider,
  Paper,
  Transition,
  useMantineTheme,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import '../styles/globals.css';

const queryClient = new QueryClient();

const useStyles = createStyles(theme => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    all: 'unset',
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    width: theme.other.lessThan768 === '1' ? '100%' : 'auto',

    '&:hover': {
      cursor: 'pointer',
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    '&:focus': {
      outline: `${theme.colors.dark[6]} 5px auto`,
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: 'dark',
      }).background,
      color: theme.fn.variant({ variant: 'light', color: 'dark' }).color,
    },
  },
}));

function App({ Component, pageProps }: AppProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState('');

  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 599px)');

  const { pathname } = useRouter();
  const { classes, cx } = useStyles();

  useEffect(() => {
    if (pathname === '/gallery') {
      setActive('gallery');
    } else if (pathname === '/') {
      setActive('home');
    } else {
      setActive('');
    }
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
          other: {
            lessThan768: '1',
          },
        }}
      >
        <AppShell
          styles={{
            main: {
              minHeight: 'calc(100vh - 60px)',
              paddingTop: '16px',
              paddingBottom: '0',
              paddingRight: isMobile ? '0' : undefined,
              paddingLeft: isMobile ? '0' : undefined,
              justifyItems: 'center',
              background:
                isMobile && !pathname.includes('gallery')
                  ? 'white'
                  : theme.colors.gray[0],
            },
          }}
          header={
            <Header height={60} className={classes.root}>
              <Container className={classes.header}>
                <Link href="/">
                  <button
                    className={styles.logo}
                    type="button"
                    tabIndex={0}
                    onClick={() => {
                      setActive('home');
                    }}
                  >
                    <img src="/centrifuge-logo.svg" alt="centrifuge logo" />
                  </button>
                </Link>
                <Group spacing={5} className={classes.links}>
                  <Link href="/">
                    <button
                      type="button"
                      className={cx(classes.link, {
                        [classes.linkActive]: active === 'home',
                      })}
                      onClick={() => {
                        setActive('home');
                      }}
                    >
                      Submit New Prediction
                    </button>
                  </Link>
                  <Link href="/gallery">
                    <button
                      type="button"
                      className={cx(classes.link, {
                        [classes.linkActive]: active === 'gallery',
                      })}
                      onClick={() => {
                        setActive('gallery');
                      }}
                    >
                      Gallery
                    </button>
                  </Link>
                </Group>

                <Burger
                  opened={opened}
                  onClick={toggle}
                  className={classes.burger}
                  size="sm"
                />

                <Transition
                  transition="pop-top-right"
                  duration={200}
                  mounted={opened}
                >
                  {style => (
                    <Paper
                      className={classes.dropdown}
                      withBorder
                      style={style}
                    >
                      <Link href="/">
                        <button
                          type="button"
                          className={cx(classes.link, {
                            [classes.linkActive]: active === 'home',
                          })}
                          onClick={() => {
                            setActive('home');
                            close();
                          }}
                          style={{ width: '100%' }}
                        >
                          Submit Prediction
                        </button>
                      </Link>
                      <Link href="/gallery">
                        <button
                          type="button"
                          className={cx(classes.link, {
                            [classes.linkActive]: active === 'gallery',
                          })}
                          onClick={() => {
                            setActive('gallery');
                            close();
                          }}
                          style={{ width: '100%' }}
                        >
                          Gallery
                        </button>
                      </Link>
                    </Paper>
                  )}
                </Transition>
              </Container>
            </Header>
          }
        >
          <Head>
            <title>Centrifuge Time Capsule</title>
            <meta name="description" content="Make your 2023 DeFi prediction" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
