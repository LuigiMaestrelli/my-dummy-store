import { render, screen } from '@testing-library/react';

import ThemeProvider from '@/presentation/theme/ThemeProvider';
import { Footer } from '@/presentation/components/common/Footer';
import theme from '@/presentation/theme';
import { hexToRgb } from '@test/utils/color';

describe('Footer', () => {
  it('should render the footer component', () => {
    const renderResult = render(
      <ThemeProvider>
        <Footer />
      </ThemeProvider>
    );
    expect(renderResult.baseElement).toBeInTheDocument();
  });

  it('should render the background with main color from theme', () => {
    render(
      <ThemeProvider>
        <Footer />
      </ThemeProvider>
    );

    const footer = screen.getByTestId('footer');
    const styles = window.getComputedStyle(footer);

    expect(styles.backgroundColor).toBe(hexToRgb(theme.palette.primary.main));
  });
});
