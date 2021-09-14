import { FC, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';

import { AlertProvider } from '@/presentation/contexts/AlertContext';
import ThemeProvider from '@/presentation/theme/ThemeProvider';
import createEmotionCache from '@/presentation/theme/createEmotionCache';

import '@/presentation/styles/globals.css';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const Noop: FC = ({ children }) => <>{children}</>;

function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  const Layout = (Component as any).Layout || Noop;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider>
        <AlertProvider>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </AlertProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
