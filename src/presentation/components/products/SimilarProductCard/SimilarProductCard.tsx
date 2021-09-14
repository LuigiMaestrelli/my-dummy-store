import Image from 'next/image';
import Link from 'next/link';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { Product } from '@/domain/models/product';

import styles from './SimilarProductCard.module.css';

type SimilarProductCardType = {
  product: Product;
};

export function SimilarProductCard({ product }: SimilarProductCardType) {
  return (
    <Link href={`/product/${product.slug}`} passHref>
      <Card
        sx={{
          padding: 1,
          display: 'flex',
          flexDirection: 'column',
          marginRight: 1,
          width: 100,
          minWidth: 100,
          cursor: 'pointer'
        }}
      >
        <Image
          src={`${product.image}?w=100`}
          alt={product.title}
          width={100}
          height={100}
        />
        <Typography
          variant="body2"
          className={styles.productTitle}
          sx={{ marginTop: 1, flex: 1 }}
        >
          {product.title}
        </Typography>
      </Card>
    </Link>
  );
}
