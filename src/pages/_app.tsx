import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';

import ThemeProvider from '@/ui/theme/ThemeProvider';
import createEmotionCache from '@/ui/theme/createEmotionCache';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider>
        <Component {...pageProps} />;
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
