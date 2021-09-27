import { useState } from 'react';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Image } from '@/presentation/components/common/Image';

import { useAlertContext } from '@/main/contexts/alertContext';
import { useAuthContext } from '@/main/contexts/authContext';

export type SignInViewProps = {
  redirectUrl?: string;
};

type LoginFormDto = {
  email: string;
  password: string;
};

const SignInSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required')
});

export default function SignInView({ redirectUrl }: SignInViewProps) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { showAlertDialog } = useAlertContext();
  const { signIn } = useAuthContext();
  const router = useRouter();

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
        await signIn(values.email, values.password);

        router.replace(redirectUrl ?? '/');
      } catch (ex: any) {
        showAlertDialog('Ops', ex.message);
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flex: 1,
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 1
        }}
      >
        <Image src="/signin.svg" alt="sign-in" width={200} height={200} />
        <form onSubmit={formik.handleSubmit} noValidate>
          <TextField
            autoFocus
            fullWidth
            id="email"
            label="Email Address"
            type="email"
            variant="standard"
            margin="dense"
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
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && !!formik.errors.password}
            helperText={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null
            }
          />
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              marginTop: 1
            }}
          >
            <Button type="submit" variant="contained">
              {isLoading && (
                <CircularProgress size={20} sx={{ marginRight: 1 }} />
              )}
              Sign-in
            </Button>
          </Box>
        </form>
      </Card>
    </Container>
  );
}
