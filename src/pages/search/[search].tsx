import Head from 'next/head';
import type { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { getProductApiClient } from '@/main/factories/infrastructure/product/productApiClient';

import SearchView, { SearchViewProps } from '@/presentation/view/main/Search';
import { Layout } from '@/presentation/components/common/Layout';

export default function SearchPage(props: SearchViewProps) {
  return (
    <>
      <Head>
        <title>My dummy store</title>
      </Head>
      <SearchView {...props} />
    </>
  );
}

SearchPage.Layout = Layout;

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

  const currentPage = parseInt(page);

  const productApi = getProductApiClient();
  const [products, total] = await productApi.find({
    query: search,
    page: currentPage,
    limit
  });

  const totalPages = Math.ceil(total / limit);

  return {
    props: {
      search,
      totalPages,
      page: currentPage,
      products
    }
  };
}
