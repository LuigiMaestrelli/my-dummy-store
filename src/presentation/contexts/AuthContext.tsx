import React, { createContext, useState, useEffect } from 'react';
import { User } from '@/domain/models/user';
import { IAuthenticationUseCase } from '@/domain/usecases/auth/authUseCase';
import { IApiClient } from '@/application/protocols/apiClient';
import { ICookieContainer } from '@/application/protocols/cookieContainer';
import { IUserApiClient } from '@/application/protocols/user/userApiClient';

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
  authUseCase: IAuthenticationUseCase;
  apiClient: IApiClient;
  cookieContainer: ICookieContainer;
  userApiClient: IUserApiClient;
};

export const AuthContext = createContext({} as AuthContextType);

const COOKIE_NAME = 'dummy-store.token';

export function AuthProvider({
  children,
  authUseCase,
  apiClient,
  cookieContainer,
  userApiClient
}: AuthProviderType) {
  const [user, setUser] = useState<User | null>(null);
  const [isSignInDialogOpen, setSignInDialogOpen] = useState<boolean>(false);
  const isAuthenticated = !!user;

  useEffect(() => {
    const authCookie = cookieContainer.getCookie(COOKIE_NAME);
    if (!authCookie) return;

    userApiClient.findByAuthToken(authCookie).then(user => {
      setUser(user);
    });
  }, [cookieContainer, userApiClient]);

  // TODO: test token is being send to the server
  // TODO: test server side functions with they have access to the token
  async function signIn(email: string, password: string) {
    const { token, user } = await authUseCase.signIn(email, password);

    apiClient.updateAuth(token);
    cookieContainer.setCookie(COOKIE_NAME, token, 60 * 60 * 5); // 5 hours
    setUser(user);
  }

  async function signOut() {
    await authUseCase.signOut();
    apiClient.updateAuth('');
    cookieContainer.deleteCookie(COOKIE_NAME);
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