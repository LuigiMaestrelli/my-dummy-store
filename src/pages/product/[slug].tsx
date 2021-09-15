import type {
  GetStaticPathsResult,
  GetStaticPropsResult,
  GetStaticPropsContext
} from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

import { Product } from '@/domain/models/product';
import { NotFoundError } from '@/domain/errors';
import { getProductApiClient } from '@/main/factories/infrastructure/product/productApiClient';

import ProductDetailView, {
  ProductDetailViewProps
} from '@/presentation/view/product/Detail';
import LoadingDetailView from '@/presentation/view/product/LoadingDetail';
import { Layout } from '@/presentation/components/common/Layout';

interface QueryParams extends ParsedUrlQuery {
  productId: string;
  slug: string;
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const productApi = getProductApiClient();
  const [products] = await productApi.find();

  const routes = products.map((p: Product) => {
    const params = `/product/${p.slug}`;
    return params;
  });

  return { paths: routes, fallback: 'blocking' };
}

export async function getStaticProps(
  context: GetStaticPropsContext<QueryParams>
): Promise<GetStaticPropsResult<ProductDetailViewProps>> {
  const { slug } = context.params as QueryParams;

  const productApi = getProductApiClient();
  const product = await productApi.findBySlug(slug);

  if (!product) {
    throw new NotFoundError(`Slug not found ${slug}`);
  }

  return {
    props: {
      product
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
