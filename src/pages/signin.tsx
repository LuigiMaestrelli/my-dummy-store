import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { getStateManagement } from '@/main/factories/infrastructure/stateManagement';
import LoginView, { LoginViewProps } from '@/presentation/view/main/SignIn';

export default LoginView;

interface UrlQueryParams extends ParsedUrlQuery {
  redirectUrl?: string;
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<LoginViewProps>> {
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
