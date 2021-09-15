import { useContext } from 'react';
import {
  AuthContext,
  AuthContextType
} from '@/presentation/contexts/AuthContext';

export function useAuthContext(): AuthContextType {
  return useContext(AuthContext);
}
