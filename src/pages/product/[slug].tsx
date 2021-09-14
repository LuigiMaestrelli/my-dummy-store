import type {
  GetStaticPathsResult,
  GetStaticPropsResult,
  GetStaticPropsContext
} from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

import { Product } from '@/domain/product';
import { createApi } from '@/services/apiAdapter';

import ProductDetailView, {
  ProductDetailViewProps
} from '@/ui/view/product/Detail';
import LoadingDetailView from '@/ui/view/product/LoadingDetail';
import { Layout } from '@/ui/components/common/Layout';

interface QueryParams extends ParsedUrlQuery {
  productId: string;
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const api = createApi();
  const { data } = await api.get<Product[]>('products');

  const routes = data.map((p: Product) => {
    const params = `/product/${p.slug}`;
    return params;
  });

  return { paths: routes, fallback: true };
}

export async function getStaticProps(
  context: GetStaticPropsContext<QueryParams>
): Promise<GetStaticPropsResult<ProductDetailViewProps>> {
  const { slug } = context.params as QueryParams;

  const api = createApi();
  const { data } = await api.get<Product[]>(`products?slug=${slug}`);

  if (!data.length) {
    throw new Error(`Slug not found ${slug}`);
  }

  return {
    props: {
      product: data[0]
    },
    revalidate: 30
  };
}

export default function ProductDetailPage({ product }: ProductDetailViewProps) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <LoadingDetailView />;
  }

  return <ProductDetailView product={product} />;
}

ProductDetailPage.Layout = Layout;
