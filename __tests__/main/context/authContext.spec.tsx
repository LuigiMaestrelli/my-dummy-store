import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { AuthProvider, useAuthContext } from '@/main/contexts/authContext';

describe('AuthContext', () => {
  it('should render children components', () => {
    render(
      <AuthProvider>
        <div>
          <span>Some text here</span>
        </div>
      </AuthProvider>
    );

    const spanText = screen.getByText('Some text here');
    expect(spanText).toBeVisible();
  });

  it('should return context consumer when calling useAuthContext', async () => {
    render(
      <AuthProvider>
        <div>
          <span>Some text here</span>
        </div>
      </AuthProvider>
    );

    const { result } = renderHook(() => useAuthContext());
    expect(result.current).toBeTruthy();
  });
});
