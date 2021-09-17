import Head from 'next/head';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { getStateManagement } from '@/main/factories/infrastructure/stateManagement';
import SignInView, { SignInViewProps } from '@/presentation/view/main/SignIn';

export default function SignInPage(props: SignInViewProps) {
  return (
    <>
      <Head>
        <title>Sign-In</title>
      </Head>
      <SignInView {...props} />
    </>
  );
}

interface UrlQueryParams extends ParsedUrlQuery {
  redirectUrl?: string;
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<SignInViewProps>> {
  const stateManagement = getStateManagement();
  if (stateManagement.isAuthenticated(ctx)) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  const query: UrlQueryParams = ctx.query;

  if (query.redirectUrl) {
    return {
      props: {
        redirectUrl: query.redirectUrl
      }
    };
  }

  return {
    props: {}
  };
}
