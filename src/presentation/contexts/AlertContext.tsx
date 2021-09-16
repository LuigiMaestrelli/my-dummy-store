import React, { createContext, useState } from 'react';

import { AlertDialog } from '@/presentation/components/common/Dialog';

export type AlertContextType = {
  showAlertDialog: (title: string, content: string) => void;
};

type AlertProviderType = {
  children: React.ReactElement;
};

type AlertDialogInfoType = {
  open: boolean;
  title: string;
  content: string;
};

export const AlertContext = createContext({} as AlertContextType);

export function AlertProvider({ children }: AlertProviderType) {
  const [alertDialogInfo, setAlertDialogInfo] = useState<AlertDialogInfoType>({
    open: false,
    title: '',
    content: ''
  });

  function handleAlertDialogClose() {
    setAlertDialogInfo({ open: false, title: '', content: '' });
  }

  function showAlertDialog(title: string, content: string) {
    setAlertDialogInfo({
      open: true,
      title,
      content
    });
  }

  return (
    <AlertContext.Provider value={{ showAlertDialog }}>
      <AlertDialog
        open={alertDialogInfo.open}
        title={alertDialogInfo.title}
        content={alertDialogInfo.content}
        onClose={handleAlertDialogClose}
      />
      {children}
    </AlertContext.Provider>
  );
}
