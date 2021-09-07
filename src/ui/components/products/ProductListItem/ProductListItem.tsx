import React from 'react';
import { Product } from '@/domain/product/Product';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';

import styles from './ProductListItem.module.css';

type Props = {
  product: Product;
};

export function ProductListItem({ product }: Props) {
  return (
    <Card sx={{ maxWidth: 345 }} className={styles.card}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
