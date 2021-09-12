import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import type { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { ProductCard } from '@/ui/components/products/ProductCard';
import { Layout } from '@/ui/components/common/Layout';

import { Product } from '@/domain/product';
import { createApi } from '@/services/apiAdapter';

interface QueryParams extends ParsedUrlQuery {
  search: string;
}

interface UrlQueryParams extends ParsedUrlQuery {
  page?: string;
}

type SearchPageProps = {
  search: string;
  page: number;
  totalPages: number;
  products: Product[];
};

export default function SearchPage({
  search,
  products,
  page,
  totalPages
}: SearchPageProps) {
  const router = useRouter();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    router.push(`/search/${search}?page=${page}`);
  };

  return (
    <>
      <Head>
        <title>My dummy store</title>
      </Head>

      <Container maxWidth="xl">
        {products.length ? (
          <Grid container spacing={1}>
            {products.map(product => (
              <Grid item key={product.id} xs={12} sm={6} md={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Container maxWidth="md">
            <Card sx={{ padding: 1, display: 'flex', flexDirection: 'row' }}>
              <Image
                src="/no_product_found.svg"
                alt="product found image"
                width={200}
                height={200}
              />
              <Box sx={{ marginLeft: 1, marginTop: 1 }}>
                <Typography variant="h2" sx={{ fontSize: '1.75rem' }}>
                  No products was found with your search.
                </Typography>
                <ul>
                  <li>
                    <Typography>Check for spell errors</Typography>
                  </li>
                  <li>
                    <Typography>
                      Use more generic words or fewer words.
                    </Typography>
                  </li>
                </ul>
              </Box>
            </Card>
          </Container>
        )}

        <Box sx={{ padding: 1, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            variant="outlined"
            shape="rounded"
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      </Container>
    </>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<QueryParams>
): Promise<GetServerSidePropsResult<SearchPageProps>> {
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

SearchPage.Layout = Layout;
