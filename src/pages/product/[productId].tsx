import type {
  GetStaticPathsResult,
  GetStaticPropsResult,
  GetStaticPropsContext
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';
import { Container } from '@mui/material';

import { Layout } from '@/ui/components/common/Layout';

import { Product } from '@/domain/product';

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
  const { data } = await axios.get<Product[]>('http://localhost:3333/products');

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

  const { data } = await axios.get<Product>(
    `http://localhost:3333/products/${productId}`
  );

  return {
    props: {
      product: data
    },
    revalidate: 30 // 30 minutos
  };
}

ProductDetail.Layout = Layout;
