import { render, screen, fireEvent } from '@testing-library/react';
import mockRouter from 'next-router-mock';

import { Product } from '@/domain/models/product';

import { ProductCard } from '@/presentation/components/products/ProductCard';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

const makeProduct = (): Product => {
  return {
    id: 1,
    title: 'valid title',
    description: 'valid description',
    category: 'valid category',
    image: 'valid image url',
    price: 4101.89,
    slug: 'valid slug',
    rating: {
      count: 1,
      rate: 1.3
    },
    otherImages: []
  };
};

describe('ProductCard', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/');
  });

  it('should render the layout component', () => {
    const product = makeProduct();
    const renderResult = render(<ProductCard product={product} />);

    expect(renderResult.baseElement).toBeInTheDocument();
  });

  it('should render the product image', () => {
    const product = makeProduct();
    render(<ProductCard product={product} />);

    const image = screen.getByTestId('product-image');
    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toBe('valid image url?w=200');
  });

  it('should render the product title', () => {
    const product = makeProduct();
    render(<ProductCard product={product} />);

    const title = screen.getByText(product.title);
    expect(title).toBeVisible();
  });

  it('should render the product price with formatted value', () => {
    const product = makeProduct();
    render(<ProductCard product={product} />);

    const price = screen.getByTestId('product-price');
    expect(price.textContent).toBe('Price: R$ 4.101,89');
  });

  it('should render the product rating with formatted value', () => {
    const product = makeProduct();
    render(<ProductCard product={product} />);

    const price = screen.getByTestId('product-ratings');
    expect(price.textContent).toBe('Ratings: 1,30');
  });

  it('should link to the product page', () => {
    const product = makeProduct();
    render(<ProductCard product={product} />);

    const card = screen.getByTestId('product-card');

    fireEvent.click(card);

    expect(mockRouter.asPath).toBe(`/product/${encodeURI(product.slug)}`);
  });
});
