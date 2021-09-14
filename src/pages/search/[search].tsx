import type { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { Product } from '@/domain/models/product';
import { createApi } from '@/infrastructure/axiosApiClient';

import SearchView, { SearchViewProps } from '@/presentation/view/main/Search';
import { Layout } from '@/presentation/components/common/Layout';

interface QueryParams extends ParsedUrlQuery {
  search: string;
}

interface UrlQueryParams extends ParsedUrlQuery {
  page?: string;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<QueryParams>
): Promise<GetServerSidePropsResult<SearchViewProps>> {
  const { search } = context.params as QueryParams;
  const { page = '1' } = context.query as UrlQueryParams;
  const limit = 20;

  const api = createApi();
  const response = await api.get<Product[]>(
    `products?q=${search}&_page=${page}&_limit=${limit}`
  );

  const totalCount = response.headers['x-total-count'];
  const currentPage = parseInt(page);
  const totalPages = Math.ceil(totalCount / limit);

  return {
    props: {
      search,
      totalPages,
      page: currentPage,
      products: response.data
    }
  };
}

export default SearchView;
(SearchView as any).Layout = Layout;
