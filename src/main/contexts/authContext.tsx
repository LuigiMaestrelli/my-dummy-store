import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { User } from '@/domain/models/user';

import { useAuthUseCase } from '@/main/factories/usecases/auth/authUseCase';
import { useUserUseCase } from '@/main/factories/usecases/user/userUseCase';
import { getApiClient } from '@/main/factories/infrastructure/apiClient';

import { SignInDialog } from '@/presentation/components/auth/SignInDialog';
import { getStateManagement } from '@/main/factories/infrastructure/stateManagement';

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  openSignInDialog: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderType = {
  children: React.ReactElement;
};

const AuthContext = createContext({} as AuthContextType);

const apiClient = getApiClient();
const stateManagement = getStateManagement();

export function AuthProvider({ children }: AuthProviderType) {
  const [user, setUser] = useState<User | null>(null);
  const [isSignInDialogOpen, setSignInDialogOpen] = useState<boolean>(false);
  const authUseCase = useAuthUseCase();
  const userUseCase = useUserUseCase();
  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    const authToken = stateManagement.getAuthToken();
    if (!authToken) return;

    apiClient.updateAuth(authToken);

    userUseCase
      .findByToken(authToken)
      .then(user => {
        setUser(user);
      })
      .catch(() => {
        setUser(null);
        stateManagement.removeAuthToken();
        apiClient.updateAuth('');
      });
  }, [userUseCase]);

  async function signIn(email: string, password: string) {
    const { token, user } = await authUseCase.signIn(email, password);

    apiClient.updateAuth(token);
    stateManagement.setAuthToken(token);
    setUser(user);
  }

  async function signOut() {
    await authUseCase.signOut();
    apiClient.updateAuth('');
    stateManagement.removeAuthToken();
    setUser(null);

    router.push('/');
  }

  function openSignInDialog() {
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

export function useAuthContext(): AuthContextType {
  return useContext(AuthContext);
}
