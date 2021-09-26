import React from 'react';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { ProductCard } from '@/presentation/components/products/ProductCard';
import { Image } from '@/presentation/components/common/Image';

import { Product } from '@/domain/models/product';

export type SearchViewProps = {
  search: string;
  page: number;
  totalPages: number;
  products: Product[];
};

export default function SearchView({
  search,
  products,
  page,
  totalPages
}: SearchViewProps) {
  const router = useRouter();

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    await router.push(`/search/${search}?page=${page}`);
  };

  return (
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
  );
}
