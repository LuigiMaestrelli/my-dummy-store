import React from 'react';
import { render, screen } from '@testing-library/react';

import NotFoundPage from '@/pages/404';

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    }
  };
});

describe('NotFoundPage', () => {
  it('should render the page', async () => {
    render(<NotFoundPage />);

    const message = await screen.findByText('Page not found');
    const image = await screen.findByAltText('not found image');
    const title = await screen.findByText('Not found');

    expect(title).toBeInTheDocument();
    expect(message).toBeVisible();
    expect(image).toBeVisible();
  });
});
