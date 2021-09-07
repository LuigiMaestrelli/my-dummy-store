import type {
  GetStaticPathsResult,
  GetStaticPropsResult,
  GetStaticPropsContext
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { Container } from '@mui/material';

import { Layout } from '@/ui/components/common/Layout';

import { Product } from '@/domain/product';
import { createApi } from '@/services/apiAdapter';

interface QueryParams extends ParsedUrlQuery {
  productId: string;
}

type Props = {
  product: Product;
};

export default function ProductDetail({ product }: Props) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <span>Carregando</span>;
  }

  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>

      <Container maxWidth="xl">
        <span>{product.description}</span>
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
    revalidate: 30 // 30 minutos
  };
}

ProductDetail.Layout = Layout;
