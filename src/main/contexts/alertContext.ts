import { useContext } from 'react';
import {
  AlertContext,
  AlertContextType
} from '@/presentation/contexts/AlertContext';

export function useAlertContext(): AlertContextType {
  return useContext(AlertContext);
}
