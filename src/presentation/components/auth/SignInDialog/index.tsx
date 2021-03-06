import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import { useAlertContext } from '@/main/contexts/alertContext';
import { FormHelperTextDataProps } from '@/presentation/protocols/formHelperTextProps';

type SignInDialogProps = {
  open: boolean;
  onClose: () => void;
  onSignIn: (email: string, password: string) => Promise<void>;
};

type LoginFormDto = {
  email: string;
  password: string;
};

const SignInSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  email: Yup.string().email('Invalid e-mail').required('Required')
});

export function SignInDialog({ open, onClose, onSignIn }: SignInDialogProps) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { showAlertDialog } = useAlertContext();

  const formik = useFormik<LoginFormDto>({
    initialValues: {
      password: '',
      email: ''
    },
    validationSchema: SignInSchema,
    onSubmit: async values => {
      if (isLoading) return;

      setLoading(true);
      try {
        await onSignIn(values.email, values.password);

        formik.resetForm();
        onClose();
      } catch (ex: any) {
        showAlertDialog('Ops', ex.message);
      } finally {
        formik.setSubmitting(false);
        setLoading(false);
      }
    }
  });

  function handleClose() {
    formik.resetForm();
    onClose();
  }

  return (
    <Dialog
      data-testid="sign-in-dialog"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Sign-in</DialogTitle>
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            id="email"
            label="Email Address"
            type="email"
            variant="standard"
            margin="dense"
            inputProps={{
              'data-testid': 'sign-in-dialog-email'
            }}
            FormHelperTextProps={
              {
                'data-testid': 'sign-in-dialog-email-helper'
              } as FormHelperTextDataProps
            }
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && !!formik.errors.email}
            helperText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null
            }
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            margin="dense"
            variant="standard"
            inputProps={{
              'data-testid': 'sign-in-dialog-password'
            }}
            FormHelperTextProps={
              {
                'data-testid': 'sign-in-dialog-password-helper'
              } as FormHelperTextDataProps
            }
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && !!formik.errors.password}
            helperText={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            autoFocus
            data-testid="sign-in-dialog-sign-in-button"
          >
            {isLoading && (
              <CircularProgress
                data-testid="sign-in-dialog-loading"
                size={20}
                sx={{ marginRight: 1 }}
              />
            )}
            Sign-in
          </Button>
          <Button
            data-testid="sign-in-dialog-cancel-button"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
