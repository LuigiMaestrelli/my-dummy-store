import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/Star';

import { Product } from '@/domain/models/product';
import { useDecimalFormatter } from '@/main/factories/infrastructure/decimalFormater';

import styles from './ProductCard.module.css';

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const { format, formatCurrent } = useDecimalFormatter();

  return (
    <Link href={`/product/${product.slug}`} passHref>
      <Card className={styles.card}>
        <CardMedia
          component="img"
          height="200"
          image={`${product.image}?w=200`}
          alt={product.title}
        />
        <CardContent className={styles.cardContent}>
          <Typography gutterBottom variant="h5" className={styles.productTitle}>
            {product.title}
          </Typography>
        </CardContent>
        <CardActions className={styles.cardFooter}>
          <Typography variant="body2" color="text.secondary">
            Price: {formatCurrent(product.price)}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className={styles.productRatings}
          >
            Ratings: {format(product.rating.rate)}
            <AccessAlarmIcon color="action" fontSize="small" />
          </Typography>
        </CardActions>
      </Card>
    </Link>
  );
}
