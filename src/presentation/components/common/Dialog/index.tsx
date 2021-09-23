import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type AlertDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  okText?: string;
};

export function AlertDialog({
  open,
  onClose,
  title,
  content,
  okText = 'Ok',
  ...otherProps
}: AlertDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ zIndex: 9999999 }}
      {...otherProps}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
