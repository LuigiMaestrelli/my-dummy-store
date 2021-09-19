import React from 'react';
import mockRouter from 'next-router-mock';
import { render, screen, fireEvent } from '@testing-library/react';
import { hexToRgb } from '@test/utils/color';
import theme from '@/presentation/theme';

import { AppBar } from '@/presentation/components/common/AppBar';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('AppBar Component', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/initial');
  });

  it('should render the store title', () => {
    render(<AppBar />);

    const title = screen.getByText('My Dummy Store');
    expect(title).toBeInTheDocument();
  });

  it('should render the app bar with correct theme color', () => {
    render(<AppBar />);

    const appBar = screen.getByTestId('app-bar');
    const styles = window.getComputedStyle(appBar);

    expect(styles.backgroundColor).toBe(hexToRgb(theme.palette.primary.main));
  });

  it('should have a title with link to the home page', () => {
    render(<AppBar />);

    const title = screen.getByText('My Dummy Store');
    expect(title.getAttribute('href')).toBe('/');
  });

  it('should redirect to the home page when clicking on the title', () => {
    render(<AppBar />);

    const title = screen.getByText('My Dummy Store');
    fireEvent.click(title);
    expect(mockRouter.asPath).toBe('/');
  });

  it('should render the avatar component on the app bar', () => {
    render(<AppBar />);

    const avatar = screen.getByTestId('user-avatar');
    expect(avatar).toBeVisible();
  });

  it('should render the search bar component on the app bar', () => {
    render(<AppBar />);

    const avatar = screen.getByTestId('app-bar-search');
    expect(avatar).toBeVisible();
  });

  it('should render offset component on the app bar', () => {
    render(<AppBar />);

    const avatar = screen.getByTestId('app-bar-offset');
    expect(avatar).toBeVisible();
  });
});
