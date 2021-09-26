import React, { createContext, useState, useCallback } from 'react';
import { AlertDialog } from '@/presentation/components/common/Dialog';

type AlertProviderType = {
  children: React.ReactElement;
};

type AlertDialogInfoType = {
  open: boolean;
  title: string;
  content: string;
};

export type AlertContextType = {
  showAlertDialog: (title: string, content: string) => void;
};

export const AlertContext = createContext({} as AlertContextType);
export const AlertContextConsumer = AlertContext.Consumer;

export function AlertContextProvider({ children }: AlertProviderType) {
  const [alertDialogInfo, setAlertDialogInfo] = useState<AlertDialogInfoType>({
    open: false,
    title: '',
    content: ''
  });

  const handleAlertDialogClose = useCallback(() => {
    setAlertDialogInfo({ ...alertDialogInfo, open: false });
  }, [alertDialogInfo]);

  const showAlertDialog = useCallback((title: string, content: string) => {
    setAlertDialogInfo({
      open: true,
      title,
      content
    });
  }, []);

  return (
    <AlertContext.Provider value={{ showAlertDialog }}>
      <AlertDialog
        data-testid="alert-dialog-alert-context"
        open={alertDialogInfo.open}
        title={alertDialogInfo.title}
        content={alertDialogInfo.content}
        onClose={handleAlertDialogClose}
      />
      {children}
    </AlertContext.Provider>
  );
}
