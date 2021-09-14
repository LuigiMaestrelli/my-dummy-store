import Head from 'next/head';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { ProductCard } from '@/ui/components/products/ProductCard';

import { Product } from '@/domain/product';

export type HomeViewProps = {
  products: Product[];
};

export default function HomeView({ products }: HomeViewProps) {
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