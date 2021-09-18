import Head from 'next/head';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Image } from '@/presentation/components/common/Image';

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Not found</title>
      </Head>

      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image
          src="/not_found.svg"
          alt="not found image"
          width={400}
          height={400}
        />
        <Typography>Page not found</Typography>
      </Container>
    </>
  );
}
