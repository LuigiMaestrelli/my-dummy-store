import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback
} from 'react';
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
  signOut: () => void;
};

type AuthProviderType = {
  children: React.ReactElement;
};

const AuthContext = createContext({} as AuthContextType);
export const AuthContextConsumer = AuthContext.Consumer;

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

    apiClient.setAuthToken(authToken);

    userUseCase
      .findByToken(authToken)
      .then(user => {
        setUser(user);
      })
      .catch(() => {
        setUser(null);
        stateManagement.removeAuthToken();
        apiClient.removeAuthToken();
      });
  }, [userUseCase]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { token, user } = await authUseCase.signIn(email, password);

      apiClient.setAuthToken(token);
      stateManagement.setAuthToken(token);
      setUser(user);
    },
    [authUseCase]
  );

  const signOut = useCallback(() => {
    apiClient.removeAuthToken();
    stateManagement.removeAuthToken();
    setUser(null);

    router.push('/');
  }, [router]);

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

export function useAuthContext(): AuthContextType {
  return useContext(AuthContext);
}
