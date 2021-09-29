import React from 'react';
import { render, screen } from '@testing-library/react';

import SignInPage from '@/pages/signin';

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    }
  };
});

describe('SignInPage', () => {
  describe('view', () => {
    it('should render the page', async () => {
      render(<SignInPage />);

      const title = await screen.findByText('Sign-in');
      expect(title).toBeInTheDocument();
    });
  });
});
