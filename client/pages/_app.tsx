import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  AppShell,
  Header,
  MantineProvider,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import '../styles/globals.css';

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 599px)');

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
        }}
      >
        <AppShell
          styles={{
            main: {
              paddingRight: isMobile ? '0' : undefined,
              paddingLeft: isMobile ? '0' : undefined,
              justifyItems: 'center',
              background: isMobile ? 'white' : theme.colors.gray[0],
            },
          }}
          header={
            <Header height={70} p="md">
              <div className={styles.logo}>
                <a href="/">
                  <img src="/centrifuge-logo.svg" alt="centrifuge logo" />
                </a>
              </div>
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
