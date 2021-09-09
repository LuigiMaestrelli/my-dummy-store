import type {
  GetStaticPathsResult,
  GetStaticPropsResult,
  GetStaticPropsContext
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';
import { Container, Card, Typography, Rating, Button } from '@mui/material';

import { Layout } from '@/ui/components/common/Layout';

import { Product } from '@/domain/product';
import { createApi } from '@/services/apiAdapter';
import { Box } from '@mui/system';
import { useDecimalFormater } from '@/services/decimalFormaterAdapter';

interface QueryParams extends ParsedUrlQuery {
  productId: string;
}

type Props = {
  product: Product;
};

export default function ProductDetail({ product }: Props) {
  const { isFallback } = useRouter();
  const { formatCurrent } = useDecimalFormater();

  const handleBuyNowClick = () => {
    alert('Not done yet');
  };

  if (isFallback) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>

      <Container maxWidth="xl">
        <Card
          sx={{
            padding: 1,
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              marginLeft: 2
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1
              }}
            >
              <Typography
                variant="h1"
                sx={{ fontSize: 22, fontWeight: 'bold', marginBottom: 2 }}
              >
                {product.title}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Typography variant="body2">
                  Category: {product.category}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Rating max={5} value={product.rating.rate} readOnly />
                  <Typography variant="body2">
                    {product.rating.count} Customer&apos;s ratings
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body1" sx={{ marginTop: 2 }}>
                {product.description}
              </Typography>

              <Typography
                variant="h2"
                sx={{ fontSize: 30, alignSelf: 'flex-end', marginTop: 2 }}
              >
                {formatCurrent(product.price)}
              </Typography>

              <Button
                variant="contained"
                sx={{ marginTop: 1, alignSelf: 'flex-end' }}
                onClick={handleBuyNowClick}
              >
                Buy now
              </Button>
            </Box>
          </Box>
        </Card>
      </Container>
    </>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const api = createApi();
  const { data } = await api.get<Product[]>('products');

  const routes = data.map((p: Product) => {
    const params = `/product/${p.id}`;
    return params;
  });

  return { paths: routes, fallback: true };
}

export async function getStaticProps(
  context: GetStaticPropsContext<QueryParams>
): Promise<GetStaticPropsResult<Props>> {
  const { productId } = context.params as QueryParams;

  const api = createApi();
  const { data } = await api.get<Product>(`products/${productId}`);

  return {
    props: {
      product: data
    },
    revalidate: 30 // 30 seconds
  };
}

ProductDetail.Layout = Layout;
