import React, { useContext } from 'react';
import {
  AlertContext,
  AlertContextProvider,
  AlertContextType
} from '@/presentation/contexts/alertContext';

export function AlertProvider(props: any) {
  return <AlertContextProvider {...props} />;
}

export function useAlertContext(): AlertContextType {
  return useContext(AlertContext);
}
