import type { GetStaticPropsResult } from 'next';

import { Product } from '@/domain/product';
import { createApi } from '@/services/apiAdapter';

import HomeView, { HomeViewProps } from '@/ui/view/main/Home';
import { Layout } from '@/ui/components/common/Layout';

export async function getStaticProps(): Promise<
  GetStaticPropsResult<HomeViewProps>
> {
  const api = createApi();
  const response = await api.get<Product[]>('products?_page=1&_limit=20');

  return {
    props: {
      products: response.data
    },
    revalidate: 30
  };
}

export default HomeView;

(HomeView as any).Layout = Layout;
