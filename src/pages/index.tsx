import type { GetStaticPropsResult } from 'next';
import Head from 'next/head';
import axios from 'axios';
import { Container, Grid } from '@mui/material';

import { ProductCard } from '@/ui/components/products/ProductCard';
import { Layout } from '@/ui/components/common/Layout';

import { Product } from '@/domain/product';

type Props = {
  products: Product[];
};

export default function Home({ products, ...otherProps }: Props) {
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

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const response = await axios.get<Product[]>(
    'http://localhost:3333/products?_page=1&_limit=20'
  );

  return {
    props: {
      products: response.data
    },
    revalidate: 10 // recriar a cada 10 segundos
  };
}

Home.Layout = Layout;
