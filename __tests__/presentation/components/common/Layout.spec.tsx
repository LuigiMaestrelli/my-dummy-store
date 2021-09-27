import { render, screen } from '@testing-library/react';

import ThemeProvider from '@/presentation/theme/ThemeProvider';
import { Layout } from '@/presentation/components/common/Layout';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('Layout', () => {
  it('should render the layout component', () => {
    const renderResult = render(
      <ThemeProvider>
        <Layout>
          <div />
        </Layout>
      </ThemeProvider>
    );

    expect(renderResult.baseElement).toBeInTheDocument();
  });

  it('should render the AppBar component', () => {
    render(
      <ThemeProvider>
        <Layout>
          <div />
        </Layout>
      </ThemeProvider>
    );

    const appBar = screen.getByTestId('app-bar');
    expect(appBar).toBeVisible();
  });

  it('should render the footer component', () => {
    render(
      <ThemeProvider>
        <Layout>
          <div />
        </Layout>
      </ThemeProvider>
    );

    const footer = screen.getByTestId('footer');
    expect(footer).toBeVisible();
  });

  it('should render the children component', () => {
    render(
      <ThemeProvider>
        <Layout>
          <div data-testid="test-div" />
        </Layout>
      </ThemeProvider>
    );

    const testDiv = screen.getByTestId('test-div');
    expect(testDiv).toBeVisible();
  });
});
