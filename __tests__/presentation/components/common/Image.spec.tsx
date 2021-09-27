import { render, screen } from '@testing-library/react';

import { Image } from '@/presentation/components/common/Image';

describe('Layout', () => {
  it('should render the Image component', () => {
    const renderResult = render(
      <Image alt="alt" src="/test.png" width={50} height={50} />
    );

    expect(renderResult.baseElement).toBeInTheDocument();
  });

  it('should render the alt attribute on the Image', () => {
    render(
      <Image
        data-testid="image-id"
        alt="some alt text"
        src="/test.png"
        width={50}
        height={50}
      />
    );

    const image = screen.getByTestId('image-id');
    expect(image.getAttribute('alt')).toBe('some alt text');
  });
});
