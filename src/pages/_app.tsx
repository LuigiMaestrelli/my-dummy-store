import { FC, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import ThemeProvider from '@/ui/theme/ThemeProvider';
import createEmotionCache from '@/ui/theme/createEmotionCache';

import '@/ui/styles/globals.css';

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
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
