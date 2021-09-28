import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

import SignInView from '@/presentation/view/main/SignIn';
import { sleep } from '@test/utils/timers';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

const mockShowAlertDialog = jest.fn();
jest.mock('@/main/contexts/alertContext', () => ({
  useAlertContext: jest.fn(() => ({
    showAlertDialog: mockShowAlertDialog
  }))
}));

const mockSignIn = jest.fn();
jest.mock('@/main/contexts/authContext', () => ({
  useAuthContext: jest.fn(() => ({
    signIn: mockSignIn
  }))
}));

describe('SignInView', () => {
  beforeEach(() => {
    mockSignIn.mockReset();
    mockShowAlertDialog.mockReset();
    mockRouter.setCurrentUrl('/dummy');
  });

  describe('general', () => {
    it('should render the component', () => {
      const result = render(<SignInView />);
      expect(result.baseElement).toBeVisible();
    });

    it('should render an e-mail and password field', () => {
      render(<SignInView />);

      const emailField = screen.getByTestId('sign-in-email');
      const passwordField = screen.getByTestId('sign-in-password');

      expect(emailField.getAttribute('type')).toBe('email');
      expect(passwordField.getAttribute('type')).toBe('password');
    });
  });

  describe('submit', () => {
    it('should call signIn with correct values', async () => {
      render(<SignInView />);

      const emailField = screen.getByTestId('sign-in-email');
      const passwordField = screen.getByTestId('sign-in-password');
      const signInBtn = screen.getByTestId('sign-in-button');

      await act(async () => {
        await userEvent.type(emailField, 'valid_email@validdomain.com', {
          delay: 50
        });
        await userEvent.type(passwordField, 'valid_password', { delay: 50 });

        fireEvent.click(signInBtn);
      });

      expect(mockSignIn).toHaveBeenCalledWith(
        'valid_email@validdomain.com',
        'valid_password'
      );
    });

    it('should call formSubmit only once', async () => {
      render(<SignInView />);

      const emailField = screen.getByTestId('sign-in-email');
      const passwordField = screen.getByTestId('sign-in-password');
      const signInBtn = screen.getByTestId('sign-in-button');

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

      expect(mockSignIn).toHaveBeenCalledTimes(1);
    });

    it('should show a message in case of error', async () => {
      mockSignIn.mockImplementationOnce(async () => {
        throw new Error('Test throw');
      });

      render(<SignInView />);

      const emailField = screen.getByTestId('sign-in-email');
      const passwordField = screen.getByTestId('sign-in-password');
      const signInBtn = screen.getByTestId('sign-in-button');

      await act(async () => {
        await userEvent.type(emailField, 'invalid_email@validdomain.com', {
          delay: 50
        });
        await userEvent.type(passwordField, 'invalid_password', { delay: 50 });

        fireEvent.click(signInBtn);
      });

      expect(mockShowAlertDialog).toHaveBeenCalledWith('Ops', 'Test throw');
    });

    it('should show loading while processing', async () => {
      mockSignIn.mockImplementationOnce(async () => {
        await sleep(100);
      });

      render(<SignInView />);

      const emailField = screen.getByTestId('sign-in-email');
      const passwordField = screen.getByTestId('sign-in-password');
      const signInBtn = screen.getByTestId('sign-in-button');

      await act(async () => {
        await userEvent.type(emailField, 'valid_email@validdomain.com', {
          delay: 50
        });
        await userEvent.type(passwordField, 'valid_password', { delay: 50 });

        fireEvent.click(signInBtn);
      });

      const loadingProcess = await screen.findByTestId('sign-in-loading');
      expect(loadingProcess).toBeVisible();
    });

    it('should call redirect to the default route if none is passed', async () => {
      render(<SignInView />);

      const emailField = screen.getByTestId('sign-in-email');
      const passwordField = screen.getByTestId('sign-in-password');
      const signInBtn = screen.getByTestId('sign-in-button');

      await act(async () => {
        await userEvent.type(emailField, 'valid_email@validdomain.com', {
          delay: 50
        });
        await userEvent.type(passwordField, 'valid_password', { delay: 50 });

        fireEvent.click(signInBtn);
      });

      expect(mockRouter.asPath).toBe('/');
    });

    it('should call redirect to informed route', async () => {
      render(<SignInView redirectUrl="/user/test" />);

      const emailField = screen.getByTestId('sign-in-email');
      const passwordField = screen.getByTestId('sign-in-password');
      const signInBtn = screen.getByTestId('sign-in-button');

      await act(async () => {
        await userEvent.type(emailField, 'valid_email@validdomain.com', {
          delay: 50
        });
        await userEvent.type(passwordField, 'valid_password', { delay: 50 });

        fireEvent.click(signInBtn);
      });

      expect(mockRouter.asPath).toBe('/user/test');
    });
  });

  describe('signIn', () => {
    it('should call signIn with valid e-mail and password values', async () => {
      render(<SignInView />);

      const emailField = screen.getByTestId('sign-in-email');
      const passwordField = screen.getByTestId('sign-in-password');
      const signInBtn = screen.getByTestId('sign-in-button');

      await act(async () => {
        await userEvent.type(emailField, 'valid_email@validdomain.com', {
          delay: 50
        });
        await userEvent.type(passwordField, 'valid_password', { delay: 50 });

        fireEvent.click(signInBtn);
      });

      expect(mockSignIn).toBeCalledWith(
        'valid_email@validdomain.com',
        'valid_password'
      );
    });

    it('should not call signIn with invalid e-mail', async () => {
      render(<SignInView />);

      const emailField = screen.getByTestId('sign-in-email');
      const passwordField = screen.getByTestId('sign-in-password');
      const signInBtn = screen.getByTestId('sign-in-button');

      await act(async () => {
        await userEvent.type(emailField, 'invalid_email', {
          delay: 50
        });
        await userEvent.type(passwordField, 'valid_password', { delay: 50 });

        fireEvent.click(signInBtn);
      });

      expect(mockSignIn).not.toBeCalled();
    });

    it('should not call signIn with invalid password', async () => {
      render(<SignInView />);

      const emailField = screen.getByTestId('sign-in-email');
      const signInBtn = screen.getByTestId('sign-in-button');

      await act(async () => {
        await userEvent.type(emailField, 'valid_email@validdomain.com', {
          delay: 50
        });

        fireEvent.click(signInBtn);
      });

      expect(mockSignIn).not.toBeCalled();
    });

    it('should show a message for invalid e-mail', async () => {
      render(<SignInView />);

      const emailField = screen.getByTestId('sign-in-email');
      const signInBtn = screen.getByTestId('sign-in-button');

      await act(async () => {
        await userEvent.type(emailField, 'invalid_email', {
          delay: 50
        });

        fireEvent.click(signInBtn);
      });

      const emailHelperText = screen.getByTestId('sign-in-email-helper');

      expect(emailHelperText).toBeVisible();
      expect(emailHelperText.textContent).toBe('Invalid e-mail');
    });

    it('should show a message for required e-mail', async () => {
      render(<SignInView />);

      const signInBtn = screen.getByTestId('sign-in-button');

      await act(async () => {
        fireEvent.click(signInBtn);
        await sleep(100);
      });

      const emailHelperText = screen.getByTestId('sign-in-email-helper');

      expect(emailHelperText).toBeVisible();
      expect(emailHelperText.textContent).toBe('Required');
    });

    it('should show a message for required password', async () => {
      render(<SignInView />);

      const emailField = screen.getByTestId('sign-in-email');
      const signInBtn = screen.getByTestId('sign-in-button');

      await act(async () => {
        await userEvent.type(emailField, 'valid_email@test.com', {
          delay: 50
        });

        fireEvent.click(signInBtn);
      });

      const passwordHelperText = screen.getByTestId('sign-in-password-helper');

      expect(passwordHelperText).toBeVisible();
      expect(passwordHelperText.textContent).toBe('Required');
    });

    it('should not show a message for a valid e-mail', async () => {
      render(<SignInView />);

      const emailField = screen.getByTestId('sign-in-email');
      const signInBtn = screen.getByTestId('sign-in-button');

      await act(async () => {
        await userEvent.type(emailField, 'valid_email@email.com', {
          delay: 50
        });

        fireEvent.click(signInBtn);
      });

      const emailHelperText = screen.queryByTestId('sign-in-email-helper');

      expect(emailHelperText).toBe(null);
    });

    it('should not show a message for a valid password', async () => {
      render(<SignInView />);

      const passwordField = screen.getByTestId('sign-in-password');
      const signInBtn = screen.getByTestId('sign-in-button');

      await act(async () => {
        await userEvent.type(passwordField, 'valid_password', {
          delay: 50
        });

        fireEvent.click(signInBtn);
      });

      const passwordHelperText = screen.queryByTestId(
        'sign-in-password-helper'
      );

      expect(passwordHelperText).toBe(null);
    });
  });
});
