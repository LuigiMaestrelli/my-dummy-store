import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import { useAuthUseCase } from '@/main/factories/usecases/auth/authUseCase';
import { useUserUseCase } from '@/main/factories/usecases/user/userUseCase';
import { getApiClient } from '@/main/factories/infrastructure/apiClient';
import { getStateManagement } from '@/main/factories/infrastructure/stateManagement';

import {
  AuthContextProvider,
  AuthContext,
  AuthContextType
} from '@/presentation/contexts/authContext';

const apiClient = getApiClient();
const stateManagement = getStateManagement();

export function AuthProvider(props: any) {
  return (
    <AuthContextProvider
      authUseCase={useAuthUseCase()}
      userUseCase={useUserUseCase()}
      stateManagement={stateManagement}
      router={useRouter()}
      apiClient={apiClient}
      {...props}
    />
  );
}

export function useAuthContext(): AuthContextType {
  return useContext(AuthContext);
}
