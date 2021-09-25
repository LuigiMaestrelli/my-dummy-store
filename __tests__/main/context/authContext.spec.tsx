import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as authUseCase from '@/main/factories/usecases/auth/authUseCase';
import { AuthContextConsumer, AuthProvider } from '@/main/contexts/authContext';

import { sleep } from '@test/utils/timers';
import { getSignInMockResult } from '@test/utils/mocks/authUseCase';

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

  it('should not open SignInDialog by default', () => {
    render(
      <AuthProvider>
        <div>
          <span>Some text here</span>
        </div>
      </AuthProvider>
    );

    const signInDialog = screen.queryByTestId('sign-in-dialog');
    expect(signInDialog).not.toBeInTheDocument();
  });

  it('should open SignInDialog when calling openSignInDialog by the consumer', () => {
    render(
      <AuthProvider>
        <AuthContextConsumer>
          {({ openSignInDialog }) => {
            return (
              <div data-testid="div-test-id" onClick={() => openSignInDialog()}>
                <span>Some text here</span>
              </div>
            );
          }}
        </AuthContextConsumer>
      </AuthProvider>
    );

    const divTest = screen.getByTestId('div-test-id');
    fireEvent.click(divTest);

    const signInDialog = screen.queryByTestId('sign-in-dialog');
    expect(signInDialog).toBeVisible();
  });

  it('should close SignDialog when pressing the cancel button', async () => {
    render(
      <AuthProvider>
        <AuthContextConsumer>
          {({ openSignInDialog }) => {
            return (
              <div data-testid="div-test-id" onClick={() => openSignInDialog()}>
                <span>Some text here</span>
              </div>
            );
          }}
        </AuthContextConsumer>
      </AuthProvider>
    );

    const divTest = screen.getByTestId('div-test-id');
    fireEvent.click(divTest);

    const signInDialog = screen.queryByTestId('sign-in-dialog');
    expect(signInDialog).toBeVisible();

    const cancelBtn = screen.getByText('Cancel');
    fireEvent.click(cancelBtn);

    await sleep(250);
    expect(signInDialog).not.toBeVisible();
  });

  it('should SignDialog call signIn when pressing the sign in button', async () => {
    const signInSpy = jest.fn(() => getSignInMockResult());
    jest.spyOn(authUseCase, 'useAuthUseCase').mockReturnValue({
      signIn: signInSpy
    });

    render(
      <AuthProvider>
        <AuthContextConsumer>
          {({ openSignInDialog }) => {
            return (
              <div data-testid="div-test-id" onClick={() => openSignInDialog()}>
                <span>Some text here</span>
              </div>
            );
          }}
        </AuthContextConsumer>
      </AuthProvider>
    );

    const divTest = screen.getByTestId('div-test-id');
    fireEvent.click(divTest);

    const emailField = screen.getByTestId('sign-in-dialog-email');
    const passwordField = screen.getByTestId('sign-in-dialog-password');
    const signInBtn = screen.getByTestId('sign-in-dialog-sign-in-button');

    await act(async () => {
      await userEvent.type(emailField, 'valid_email@validdomain.com', {
        delay: 50
      });
      await userEvent.type(passwordField, 'valid_password', { delay: 50 });

      fireEvent.click(signInBtn);
    });

    expect(signInSpy).toBeCalledWith(
      'valid_email@validdomain.com',
      'valid_password'
    );
  });
});
