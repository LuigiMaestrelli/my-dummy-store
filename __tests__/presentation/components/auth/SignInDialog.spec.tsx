import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SignInDialog } from '@/presentation/components/auth/SignInDialog';
import { sleep } from '@test/utils/timers';

const mockShowAlertDialog = jest.fn();
jest.mock('@/main/contexts/alertContext', () => ({
  useAlertContext: jest.fn(() => ({
    showAlertDialog: mockShowAlertDialog
  }))
}));

describe('SignInDialog', () => {
  beforeEach(() => {
    mockShowAlertDialog.mockReset();
  });

  describe('general', () => {
    it('should render the dialog', () => {
      render(
        <SignInDialog open={true} onClose={jest.fn()} onSignIn={jest.fn()} />
      );

      const dialog = screen.getByTestId('sign-in-dialog');
      expect(dialog).toBeVisible();
    });

    it('should not be visible if open is false', () => {
      render(
        <SignInDialog open={false} onClose={jest.fn()} onSignIn={jest.fn()} />
      );

      const dialog = screen.queryByTestId('sign-in-dialog');
      expect(dialog).not.toBeInTheDocument();
    });

    it('should render an e-mail and password field', () => {
      render(
        <SignInDialog open={true} onClose={jest.fn()} onSignIn={jest.fn()} />
      );

      const emailField = screen.getByTestId('sign-in-dialog-email');
      const passwordField = screen.getByTestId('sign-in-dialog-password');

      expect(emailField.getAttribute('type')).toBe('email');
      expect(passwordField.getAttribute('type')).toBe('password');
    });
  });

  describe('close', () => {
    it('should call onClose on press cancel button', () => {
      const onCloseSpy = jest.fn();
      render(
        <SignInDialog open={true} onClose={onCloseSpy} onSignIn={jest.fn()} />
      );

      const cancelBtn = screen.getByTestId('sign-in-dialog-cancel-button');
      fireEvent.click(cancelBtn);

      expect(onCloseSpy).toBeCalled();
    });
  });

  describe('signIn', () => {
    it('should call onSignIn with valid e-mail and password values', async () => {
      const onSignInSpy = jest.fn();
      render(
        <SignInDialog open={true} onClose={jest.fn()} onSignIn={onSignInSpy} />
      );

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

      expect(onSignInSpy).toBeCalledWith(
        'valid_email@validdomain.com',
        'valid_password'
      );
    });

    it('should not call onSignIn with invalid e-mail', async () => {
      const onSignInSpy = jest.fn();
      render(
        <SignInDialog open={true} onClose={jest.fn()} onSignIn={onSignInSpy} />
      );

      const emailField = screen.getByTestId('sign-in-dialog-email');
      const passwordField = screen.getByTestId('sign-in-dialog-password');
      const signInBtn = screen.getByTestId('sign-in-dialog-sign-in-button');

      await act(async () => {
        await userEvent.type(emailField, 'invalid_email', {
          delay: 50
        });
        await userEvent.type(passwordField, 'valid_password', { delay: 50 });

        fireEvent.click(signInBtn);
      });

      expect(onSignInSpy).not.toBeCalled();
    });

    it('should not call onSignIn with invalid password', async () => {
      const onSignInSpy = jest.fn();
      render(
        <SignInDialog open={true} onClose={jest.fn()} onSignIn={onSignInSpy} />
      );

      const emailField = screen.getByTestId('sign-in-dialog-email');
      const signInBtn = screen.getByTestId('sign-in-dialog-sign-in-button');

      await act(async () => {
        await userEvent.type(emailField, 'valid_email@validdomain.com', {
          delay: 50
        });

        fireEvent.click(signInBtn);
      });

      expect(onSignInSpy).not.toBeCalled();
    });

    it('should show a message for invalid e-mail', async () => {
      render(
        <SignInDialog open={true} onClose={jest.fn()} onSignIn={jest.fn()} />
      );

      const emailField = screen.getByTestId('sign-in-dialog-email');
      const signInBtn = screen.getByTestId('sign-in-dialog-sign-in-button');

      await act(async () => {
        await userEvent.type(emailField, 'invalid_email', {
          delay: 50
        });

        fireEvent.click(signInBtn);
      });

      const emailHelperText = screen.getByTestId('sign-in-dialog-email-helper');

      expect(emailHelperText).toBeVisible();
      expect(emailHelperText.textContent).toBe('Invalid e-mail');
    });

    it('should show a message for required e-mail', async () => {
      render(
        <SignInDialog open={true} onClose={jest.fn()} onSignIn={jest.fn()} />
      );

      const signInBtn = screen.getByTestId('sign-in-dialog-sign-in-button');

      await act(async () => {
        fireEvent.click(signInBtn);
        await sleep(100);
      });

      const emailHelperText = screen.getByTestId('sign-in-dialog-email-helper');

      expect(emailHelperText).toBeVisible();
      expect(emailHelperText.textContent).toBe('Required');
    });

    it('should show a message for required password', async () => {
      render(
        <SignInDialog open={true} onClose={jest.fn()} onSignIn={jest.fn()} />
      );

      const emailField = screen.getByTestId('sign-in-dialog-email');
      const signInBtn = screen.getByTestId('sign-in-dialog-sign-in-button');

      await act(async () => {
        await userEvent.type(emailField, 'valid_email@test.com', {
          delay: 50
        });

        fireEvent.click(signInBtn);
      });

      const passwordHelperText = screen.getByTestId(
        'sign-in-dialog-password-helper'
      );

      expect(passwordHelperText).toBeVisible();
      expect(passwordHelperText.textContent).toBe('Required');
    });

    it('should not show a message for a valid e-mail', async () => {
      render(
        <SignInDialog open={true} onClose={jest.fn()} onSignIn={jest.fn()} />
      );

      const emailField = screen.getByTestId('sign-in-dialog-email');
      const signInBtn = screen.getByTestId('sign-in-dialog-sign-in-button');

      await act(async () => {
        await userEvent.type(emailField, 'valid_email@email.com', {
          delay: 50
        });

        fireEvent.click(signInBtn);
      });

      const emailHelperText = screen.queryByTestId(
        'sign-in-dialog-email-helper'
      );

      expect(emailHelperText).toBe(null);
    });

    it('should not show a message for a valid password', async () => {
      render(
        <SignInDialog open={true} onClose={jest.fn()} onSignIn={jest.fn()} />
      );

      const passwordField = screen.getByTestId('sign-in-dialog-password');
      const signInBtn = screen.getByTestId('sign-in-dialog-sign-in-button');

      await act(async () => {
        await userEvent.type(passwordField, 'valid_password', {
          delay: 50
        });

        fireEvent.click(signInBtn);
      });

      const passwordHelperText = screen.queryByTestId(
        'sign-in-dialog-password-helper'
      );

      expect(passwordHelperText).toBe(null);
    });
  });

  describe('submit', () => {
    it('should call formSubmit only once', async () => {
      const onSignInSpy = jest.fn(async () => await sleep(500));

      render(
        <SignInDialog
          open={true}
          onClose={jest.fn()}
          onSignIn={onSignInSpy as any}
        />
      );

      const emailField = screen.getByTestId('sign-in-dialog-email');
      const passwordField = screen.getByTestId('sign-in-dialog-password');
      const signInBtn = screen.getByTestId('sign-in-dialog-sign-in-button');

      await act(async () => {
        await userEvent.type(emailField, 'valid_email@validdomain.com', {
          delay: 50
        });
        await userEvent.type(passwordField, 'valid_password', { delay: 50 });

        fireEvent.click(signInBtn);
        fireEvent.click(signInBtn);
        fireEvent.click(signInBtn);
        fireEvent.click(signInBtn);
      });

      expect(onSignInSpy).toHaveBeenCalledTimes(1);
    });

    it('should show a message in case of error', async () => {
      const onSignInSpy = jest.fn(() => {
        throw new Error('test throw');
      });

      render(
        <SignInDialog
          open={true}
          onClose={jest.fn()}
          onSignIn={onSignInSpy as any}
        />
      );

      const emailField = screen.getByTestId('sign-in-dialog-email');
      const passwordField = screen.getByTestId('sign-in-dialog-password');
      const signInBtn = screen.getByTestId('sign-in-dialog-sign-in-button');

      await act(async () => {
        await userEvent.type(emailField, 'invalid_email@validdomain.com', {
          delay: 50
        });
        await userEvent.type(passwordField, 'invalid_password', { delay: 50 });

        fireEvent.click(signInBtn);
      });

      expect(mockShowAlertDialog).toHaveBeenCalledWith('Ops', 'test throw');
    });

    it('should show loading while processing', async () => {
      const onSignInSpy = jest.fn(async () => await sleep(500));

      render(
        <SignInDialog
          open={true}
          onClose={jest.fn()}
          onSignIn={onSignInSpy as any}
        />
      );

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

      const loadingProcess = screen.getByTestId('sign-in-dialog-loading');
      expect(loadingProcess).toBeVisible();
    });
  });
});
