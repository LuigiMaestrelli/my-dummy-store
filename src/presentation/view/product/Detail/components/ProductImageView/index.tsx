import { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { Image } from '@/presentation/components/common/Image';

import styles from './ProductImageView.module.css';

type ProductImageViewProps = {
  productTitle: string;
  primaryImageUrl: string;
  images: string[];
};

export function ProductImageView({
  primaryImageUrl,
  images,
  productTitle
}: ProductImageViewProps) {
  const [currentImage, setCurrentImage] = useState<string>(primaryImageUrl);
  const [otherImages, setOtherImages] = useState<string[]>([]);

  useEffect(() => {
    setCurrentImage(primaryImageUrl);
    setOtherImages([primaryImageUrl, ...images]);
  }, [primaryImageUrl, images]);

  function handleSelectImage(imageUrl: string) {
    setCurrentImage(imageUrl);
  }

  return (
    <div className={styles.root}>
      <ImageList sx={{ width: 100, height: 400 }} cols={1}>
        {otherImages.map((image: string, index) => (
          <ImageListItem key={index}>
            <Image
              src={`${image}?w=100`}
              alt={productTitle}
              width={100}
              height={100}
              className={styles.imagePreview}
              onMouseEnter={() => handleSelectImage(image)}
              onClick={() => handleSelectImage(image)}
              data-testid="product-other-image"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <div className={styles.imageBox}>
        <Image
          src={`${currentImage}?w=400`}
          alt={productTitle}
          width={400}
          height={400}
          data-testid="product-primary-image"
        />
      </div>
    </div>
  );
}
