import { getStateManagement } from '@/main/factories/infrastructure/stateManagement';
import { Layout } from '@/presentation/components/common/Layout';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

export default function UserPage() {
  return <h1>User area</h1>;
}

UserPage.Layout = Layout;

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  const stateManagement = getStateManagement();
  if (!stateManagement.isAuthenticated(ctx)) {
    return {
      redirect: {
        destination: `/signin?redirectUrl=${encodeURIComponent('/user')}`,
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
}
