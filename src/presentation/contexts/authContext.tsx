import React, { createContext, useState, useEffect, useCallback } from 'react';
import { NextRouter } from 'next/router';

import { User } from '@/domain/models/user';
import { IAuthenticationUseCase } from '@/domain/usecases/auth/authUseCase';
import { IUserUseCase } from '@/domain/usecases/user/userUseCase';
import { IApiClient } from '@/application/protocols/apiClient';
import { IStateManagement } from '@/application/protocols/stateManagement';

import { SignInDialog } from '@/presentation/components/auth/SignInDialog';

type AuthProviderType = {
  children: React.ReactElement;
  authUseCase: IAuthenticationUseCase;
  userUseCase: IUserUseCase;
  router: NextRouter;
  apiClient: IApiClient;
  stateManagement: IStateManagement;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  openSignInDialog: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);
export const AuthContextConsumer = AuthContext.Consumer;

export function AuthContextProvider({
  authUseCase,
  userUseCase,
  router,
  apiClient,
  stateManagement,
  children
}: AuthProviderType) {
  const [user, setUser] = useState<User | null>(null);
  const [isSignInDialogOpen, setSignInDialogOpen] = useState<boolean>(false);

  const isAuthenticated = !!user;

  useEffect(() => {
    const authToken = stateManagement.getAuthToken();
    if (!authToken) return;

    apiClient.setAuthToken(authToken);

    userUseCase
      .findByToken(authToken)
      .then(user => setUser(user))
      .catch(() => {
        setUser(null);
        stateManagement.removeAuthToken();
        apiClient.removeAuthToken();
      });
  }, [userUseCase, stateManagement, apiClient]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { token, user } = await authUseCase.signIn(email, password);

      apiClient.setAuthToken(token);
      stateManagement.setAuthToken(token);
      setUser(user);
    },
    [authUseCase, stateManagement, apiClient]
  );

  const signOut = useCallback(async () => {
    apiClient.removeAuthToken();
    stateManagement.removeAuthToken();
    setUser(null);

    await router.push('/');
  }, [router, stateManagement, apiClient]);

  const openSignInDialog = useCallback(() => {
    setSignInDialogOpen(true);
  }, []);

  const handleCloseLoginDialog = useCallback(() => {
    setSignInDialogOpen(false);
  }, []);

  const handleSignInDialog = useCallback(
    async (email: string, password: string) => {
      await signIn(email, password);
    },
    [signIn]
  );

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, signIn, signOut, openSignInDialog }}
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
