import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

import { SearchBar } from '@/presentation/components/common/AppBar/components';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('AppBar - SearchBar Component', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/');
  });

  it('should render the search bar component', () => {
    const renderResult = render(<SearchBar />);
    expect(renderResult.baseElement).toBeInTheDocument();
  });

  it('should render the search bar input component', () => {
    render(<SearchBar />);

    const input = screen.getByTestId('search-bar-input');
    expect(input).toBeInTheDocument();
  });

  it('should redirect to search page on enter in the input component', async () => {
    render(<SearchBar />);

    const searchText = 'text here';
    const input = screen.getByTestId('search-bar-input');
    await act(async () => {
      await userEvent.type(input, `${searchText}{enter}`, { delay: 100 });
    });

    const encodedText = encodeURI(searchText);
    expect(mockRouter.asPath).toBe(`/search/${encodedText}`);
  });

  it('should redirect to search page with encoded uri', async () => {
    render(<SearchBar />);

    const searchText = 'ção test !@() test';
    const input = screen.getByTestId('search-bar-input');
    await act(async () => {
      await userEvent.type(input, `${searchText}{enter}`, { delay: 100 });
    });

    const encodedText = encodeURI(searchText);
    expect(mockRouter.asPath).toBe(`/search/${encodedText}`);
  });
});
