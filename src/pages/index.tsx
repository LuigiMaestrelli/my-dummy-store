import type { GetStaticPropsResult } from 'next';
import Head from 'next/head';

import { getProductApiClient } from '@/main/factories/infrastructure/product/productApiClient';

import HomeView, { HomeViewProps } from '@/presentation/view/main/Home';
import { Layout } from '@/presentation/components/common/Layout';

export async function getStaticProps(): Promise<
  GetStaticPropsResult<HomeViewProps>
> {
  const productApi = getProductApiClient();
  const [products] = await productApi.find({
    page: 1,
    limit: 20
  });

  return {
    props: {
      products
    },
    revalidate: 30
  };
}

export default function HomePage(props: HomeViewProps) {
  return (
    <>
      <Head>
        <title>My dummy store</title>
      </Head>
      <HomeView {...props} />
    </>
  );
}

HomePage.Layout = Layout;
