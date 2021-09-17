import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { ProductCard } from '@/presentation/components/products/ProductCard';

import { Product } from '@/domain/models/product';

export type HomeViewProps = {
  products: Product[];
};

export default function HomeView({ products }: HomeViewProps) {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={1}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
