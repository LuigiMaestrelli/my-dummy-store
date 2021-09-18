import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppBar } from '@/presentation/components/common/AppBar';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: ''
    };
  }
}));

describe('AppBar', () => {
  it('renders the store title', () => {
    render(<AppBar />);

    const title = screen.getAllByText('My Dummy Store');
    expect(title[0]).toBeInTheDocument();
  });
});
