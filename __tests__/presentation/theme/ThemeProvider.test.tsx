import { render, screen } from '@testing-library/react';

import ThemeProvider from '@/presentation/theme/ThemeProvider';

describe('Theme provider', () => {
  it('should render the children component', () => {
    render(
      <ThemeProvider>
        <div>
          <span>children here</span>
        </div>
      </ThemeProvider>
    );

    const span = screen.getByText('children here');
    expect(span).toBeVisible();
  });
});
