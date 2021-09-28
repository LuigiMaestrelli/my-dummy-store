import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ProductImageView } from '@/presentation/view/product/Detail/components';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  }
}));

describe('ProductImageView', () => {
  it('should render the component', () => {
    const result = render(
      <ProductImageView
        productTitle="title here"
        primaryImageUrl="https://primary_image_url"
        images={[]}
      />
    );

    expect(result.baseElement).toBeVisible();
  });

  it('should render the primary image as default', () => {
    render(
      <ProductImageView
        productTitle="title here"
        primaryImageUrl="https://primary_image_url"
        images={['https://other_image_url']}
      />
    );

    const image = screen.getByTestId('product-primary-image');
    expect(image).toBeVisible();
    expect(image.getAttribute('src')).toBe('https://primary_image_url?w=400');
  });

  it('should render the other images', async () => {
    render(
      <ProductImageView
        productTitle="title here"
        primaryImageUrl="https://primary_image_url"
        images={[
          'https://other_image_url_1',
          'https://other_image_url_2',
          'https://other_image_url_3'
        ]}
      />
    );

    const images = await screen.findAllByTestId('product-other-image');
    expect(images.length).toBe(4); // the default plus the other
  });

  it('should change the default image when clicking on the other image', async () => {
    render(
      <ProductImageView
        productTitle="title here"
        primaryImageUrl="https://primary_image_url"
        images={['https://other_image_url']}
      />
    );

    const otherImages = screen.getAllByTestId('product-other-image');

    act(() => {
      userEvent.click(otherImages[1]);
    });

    const primaryImage = screen.getByTestId('product-primary-image');
    expect(primaryImage.getAttribute('src')).toBe(
      'https://other_image_url?w=400'
    );
  });
});
