import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { AlertProvider, useAlertContext } from '@/main/contexts/alertContext';

describe('AlertContext', () => {
  it('should render children components', () => {
    render(
      <AlertProvider>
        <div>
          <span>Some text here</span>
        </div>
      </AlertProvider>
    );

    const spanText = screen.getByText('Some text here');
    expect(spanText).toBeVisible();
  });

  it('should return context consumer when calling useAlertContext', async () => {
    render(
      <AlertProvider>
        <div>
          <span>Some text here</span>
        </div>
      </AlertProvider>
    );

    const { result } = renderHook(() => useAlertContext());
    expect(result.current).toBeTruthy();
  });
});
