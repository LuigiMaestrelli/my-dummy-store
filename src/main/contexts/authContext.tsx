import React, { createContext, useState, useEffect, useContext } from 'react';
import { User } from '@/domain/models/user';

import { useUserUseCase } from '@/main/factories/usecases/auth/authUseCase';
import { getApiClient } from '@/main/factories/infrastructure/apiClient';
import { getUserApiClient } from '@/main/factories/infrastructure/user/userApiClient';
import { getCookieContainer } from '@/main/factories/infrastructure/cookieContainer';

import { SignInDialog } from '@/presentation/components/auth/SignInDialog';

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  openLoginDialog: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderType = {
  children: React.ReactElement;
};

const AuthContext = createContext({} as AuthContextType);
const AUTH_COOKIE_NAME = process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME || '';

const cookieContainer = getCookieContainer();
const apiClient = getApiClient();
const userApiClient = getUserApiClient();

export function AuthProvider({ children }: AuthProviderType) {
  const [user, setUser] = useState<User | null>(null);
  const [isSignInDialogOpen, setSignInDialogOpen] = useState<boolean>(false);
  const authUseCase = useUserUseCase();

  const isAuthenticated = !!user;

  useEffect(() => {
    const authCookie = cookieContainer.getCookie(AUTH_COOKIE_NAME);
    if (!authCookie) return;

    apiClient.updateAuth(authCookie);

    userApiClient
      .findByAuthToken(authCookie)
      .then(user => {
        setUser(user);
      })
      .catch(() => {
        setUser(null);
        cookieContainer.deleteCookie(AUTH_COOKIE_NAME);
        apiClient.updateAuth('');
      });
  }, []);

  async function signIn(email: string, password: string) {
    const { token, user } = await authUseCase.signIn(email, password);

    apiClient.updateAuth(token);
    cookieContainer.setCookie(AUTH_COOKIE_NAME, token, 60 * 60 * 5); // 5 hours
    setUser(user);
  }

  async function signOut() {
    await authUseCase.signOut();
    apiClient.updateAuth('');
    cookieContainer.deleteCookie(AUTH_COOKIE_NAME);
    setUser(null);
  }

  function openLoginDialog() {
    setSignInDialogOpen(true);
  }

  function handleCloseLoginDialog() {
    setSignInDialogOpen(false);
  }

  async function handleSignInDialog(email: string, password: string) {
    await signIn(email, password);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, signIn, signOut, openLoginDialog }}
    >
      <SignInDialog
        open={isSignInDialogOpen}
        onClose={handleCloseLoginDialog}
        onSignIn={handleSignInDialog}
      />
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextType {
  return useContext(AuthContext);
}
