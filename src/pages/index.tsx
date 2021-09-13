import type { GetStaticPropsResult } from 'next';
import Head from 'next/head';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { ProductCard } from '@/ui/components/products/ProductCard';
import { Layout } from '@/ui/components/common/Layout';

import { Product } from '@/domain/product';
import { createApi } from '@/services/apiAdapter';

type HomePageProps = {
  products: Product[];
};

export default function HomePage({ products }: HomePageProps) {
  return (
    <>
      <Head>
        <title>My dummy store</title>
      </Head>

      <Container maxWidth="xl">
        <Grid container spacing={1}>
          {products.map(product => (
            <Grid item key={product.id} xs={12} sm={6} md={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<HomePageProps>
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

HomePage.Layout = Layout;
