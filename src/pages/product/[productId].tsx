import { useContext } from 'react';
import type {
  GetStaticPathsResult,
  GetStaticPropsResult,
  GetStaticPropsContext
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';

import { Product } from '@/domain/product';
import { createApi } from '@/services/apiAdapter';
import { useDecimalFormatter } from '@/services/decimalFormatterAdapter';
import { AlertContext } from '@/ui/contexts/AlertContext';
import { useFindSimilarProduct } from '@/application/product/findSimilarProduct';

import { Layout } from '@/ui/components/common/Layout';
import { ProductImageView } from '@/ui/components/products/ProductImageView';
import { SimilarProductCard } from '@/ui/components/products/SimilarProductCard';

interface QueryParams extends ParsedUrlQuery {
  productId: string;
}

type Props = {
  product: Product;
};

export default function ProductDetail({ product }: Props) {
  const { isFallback } = useRouter();
  const { formatCurrent, format } = useDecimalFormatter();
  const { showAlertDialog } = useContext(AlertContext);
  const similarProducts = useFindSimilarProduct(product);

  const handleBuyNowClick = () => {
    showAlertDialog('Hello!', 'Not done yet');
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
          <Grid container>
            <Grid item xs={12} sm={5}>
              <ProductImageView
                primaryImageUrl={product.image}
                images={product.otherImages}
                productTitle={product.title}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
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
                      <Tooltip title={format(product.rating.rate)} arrow>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <Rating
                            max={5}
                            precision={0.1}
                            value={product.rating.rate}
                            readOnly
                          />
                        </Box>
                      </Tooltip>
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
            </Grid>
          </Grid>
        </Card>

        <Card
          sx={{
            marginTop: 2,
            padding: 1,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: '1rem',
              marginBottom: 1,
              fontWeight: 'bold'
            }}
          >
            Similar products that you may like
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              overflow: 'auto',
              paddingBottom: 1
            }}
          >
            {similarProducts.map((product: Product) => (
              <SimilarProductCard key={product.id} product={product} />
            ))}
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
