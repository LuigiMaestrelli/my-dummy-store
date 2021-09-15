import { FC, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';

import { useUserUseCase } from '@/main/factories/usecases/auth/authUseCase';
import { getApiClient } from '@/main/factories/infrastructure/apiClient';
import { getUserApiClient } from '@/main/factories/infrastructure/user/userApiClient';
import { getCookieContainer } from '@/main/factories/infrastructure/cookieContainer';

import { AlertProvider } from '@/presentation/contexts/AlertContext';
import { AuthProvider } from '@/presentation/contexts/AuthContext';
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
        <AuthProvider
          authUseCase={useUserUseCase()}
          apiClient={getApiClient()}
          cookieContainer={getCookieContainer()}
          userApiClient={getUserApiClient()}
        >
          <AlertProvider>
            <Layout {...pageProps}>
              <Component {...pageProps} />
            </Layout>
          </AlertProvider>
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
