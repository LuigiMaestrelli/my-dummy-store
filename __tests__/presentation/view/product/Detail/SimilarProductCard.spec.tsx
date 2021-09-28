import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import userEvent from '@testing-library/user-event';

import { SimilarProductCard } from '@/presentation/view/product/Detail/components';
import { Product } from '@/domain/models/product';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

const makeFakeProduct = (): Product => {
  return {
    id: 3,
    title: 'Mens Cotton Jacket',
    price: 55.99,
    description:
      'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    rating: {
      rate: 4.7,
      count: 500
    },
    otherImages: [],
    slug: 'mens_cotton_jacket_-_KCOYJL2SWN'
  };
};

describe('LoadingDetail', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/dummy');
  });

  it('should render the component', () => {
    const product = makeFakeProduct();

    const result = render(<SimilarProductCard product={product} />);
    expect(result.baseElement).toBeVisible();
  });

  it('should render the product title', () => {
    const product = makeFakeProduct();

    render(<SimilarProductCard product={product} />);

    const title = screen.getByText(product.title);
    expect(title).toBeVisible();
  });

  it('should render the product image', () => {
    const product = makeFakeProduct();

    render(<SimilarProductCard product={product} />);

    const image = screen.getByTestId('similar-product-image');
    expect(image).toBeVisible();
    expect(image.getAttribute('alt')).toBe(product.title);
  });

  it('should navigate to product detail on click', () => {
    const product = makeFakeProduct();

    render(<SimilarProductCard product={product} />);

    const container = screen.getByTestId('similar-product');
    userEvent.click(container);

    expect(mockRouter.asPath).toBe(`/product/${product.slug}`);
  });
});
