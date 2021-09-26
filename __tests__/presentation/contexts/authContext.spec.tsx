import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next-router-mock';
import { renderHook } from '@testing-library/react-hooks';
import { act as actTestRender } from 'react-test-renderer';

import {
  AuthContextConsumer,
  AuthContextProvider
} from '@/presentation/contexts/authContext';

import { sleep } from '@test/utils/timers';
import { makeAuthUseCaseStub } from '@test/utils/stubs//usecases/authUseCase';
import { makeUserUseCaseStub } from '@test/utils/stubs/usecases/userUseCase';
import { makeApiClientStub } from '@test/utils/stubs/infrastructure/apiClient';
import { makeStateManagementStub } from '@test/utils/stubs/infrastructure/stateManagement';
import { User } from '@/domain/models/user';

describe('AuthContextProvider', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('general', () => {
    it('should render children components', () => {
      const authUseCaseStub = makeAuthUseCaseStub();
      const userUseCaseStub = makeUserUseCaseStub();
      const apiClientStub = makeApiClientStub();
      const stateManagementStub = makeStateManagementStub();

      const { result } = renderHook(() => useRouter());

      render(
        <AuthContextProvider
          authUseCase={authUseCaseStub}
          userUseCase={userUseCaseStub}
          apiClient={apiClientStub}
          stateManagement={stateManagementStub}
          router={result.current}
        >
          <div>
            <span>Some text here</span>
          </div>
        </AuthContextProvider>
      );

      const spanText = screen.getByText('Some text here');
      expect(spanText).toBeVisible();
    });
  });

  describe('SignInDialog', () => {
    it('should not open SignInDialog by default', () => {
      const authUseCaseStub = makeAuthUseCaseStub();
      const userUseCaseStub = makeUserUseCaseStub();
      const apiClientStub = makeApiClientStub();
      const stateManagementStub = makeStateManagementStub();
      const { result } = renderHook(() => useRouter());

      render(
        <AuthContextProvider
          authUseCase={authUseCaseStub}
          userUseCase={userUseCaseStub}
          apiClient={apiClientStub}
          stateManagement={stateManagementStub}
          router={result.current}
        >
          <div>
            <span>Some text here</span>
          </div>
        </AuthContextProvider>
      );

      const signInDialog = screen.queryByTestId('sign-in-dialog');
      expect(signInDialog).not.toBeInTheDocument();
    });

    it('should open SignInDialog when calling openSignInDialog by the consumer', () => {
      const authUseCaseStub = makeAuthUseCaseStub();
      const userUseCaseStub = makeUserUseCaseStub();
      const apiClientStub = makeApiClientStub();
      const stateManagementStub = makeStateManagementStub();
      const { result } = renderHook(() => useRouter());

      render(
        <AuthContextProvider
          authUseCase={authUseCaseStub}
          userUseCase={userUseCaseStub}
          apiClient={apiClientStub}
          stateManagement={stateManagementStub}
          router={result.current}
        >
          <AuthContextConsumer>
            {({ openSignInDialog }) => {
              return (
                <div
                  data-testid="div-test-id"
                  onClick={() => openSignInDialog()}
                >
                  <span>Some text here</span>
                </div>
              );
            }}
          </AuthContextConsumer>
        </AuthContextProvider>
      );

      const divTest = screen.getByTestId('div-test-id');
      fireEvent.click(divTest);

      const signInDialog = screen.queryByTestId('sign-in-dialog');
      expect(signInDialog).toBeVisible();
    });

    it('should close SignDialog when pressing the cancel button', async () => {
      const authUseCaseStub = makeAuthUseCaseStub();
      const userUseCaseStub = makeUserUseCaseStub();
      const apiClientStub = makeApiClientStub();
      const stateManagementStub = makeStateManagementStub();
      const { result } = renderHook(() => useRouter());

      render(
        <AuthContextProvider
          authUseCase={authUseCaseStub}
          userUseCase={userUseCaseStub}
          apiClient={apiClientStub}
          stateManagement={stateManagementStub}
          router={result.current}
        >
          <AuthContextConsumer>
            {({ openSignInDialog }) => {
              return (
                <div
                  data-testid="div-test-id"
                  onClick={() => openSignInDialog()}
                >
                  <span>Some text here</span>
                </div>
              );
            }}
          </AuthContextConsumer>
        </AuthContextProvider>
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
      const authUseCaseStub = makeAuthUseCaseStub();
      const userUseCaseStub = makeUserUseCaseStub();
      const apiClientStub = makeApiClientStub();
      const stateManagementStub = makeStateManagementStub();
      const { result } = renderHook(() => useRouter());

      const signInSpy = jest.spyOn(authUseCaseStub, 'signIn');

      render(
        <AuthContextProvider
          authUseCase={authUseCaseStub}
          userUseCase={userUseCaseStub}
          apiClient={apiClientStub}
          stateManagement={stateManagementStub}
          router={result.current}
        >
          <AuthContextConsumer>
            {({ openSignInDialog }) => {
              return (
                <div
                  data-testid="div-test-id"
                  onClick={() => openSignInDialog()}
                >
                  <span>Some text here</span>
                </div>
              );
            }}
          </AuthContextConsumer>
        </AuthContextProvider>
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

  describe('signIn', () => {
    it('should call authUseCase with correct values', async () => {
      const authUseCaseStub = makeAuthUseCaseStub();
      const userUseCaseStub = makeUserUseCaseStub();
      const apiClientStub = makeApiClientStub();
      const stateManagementStub = makeStateManagementStub();
      const { result } = renderHook(() => useRouter());

      const signInSpy = jest.spyOn(authUseCaseStub, 'signIn');
      let signInContext: any;

      render(
        <AuthContextProvider
          authUseCase={authUseCaseStub}
          userUseCase={userUseCaseStub}
          apiClient={apiClientStub}
          stateManagement={stateManagementStub}
          router={result.current}
        >
          <AuthContextConsumer>
            {({ signIn }) => {
              signInContext = signIn;

              return (
                <div data-testid="div-test-id">
                  <span>Some text here</span>
                </div>
              );
            }}
          </AuthContextConsumer>
        </AuthContextProvider>
      );

      await act(async () => {
        await signInContext('valid email', 'valid password');
      });

      expect(signInSpy).toBeCalledWith('valid email', 'valid password');
    });

    it('should call setAuthToken on the apiClient', async () => {
      const authUseCaseStub = makeAuthUseCaseStub();
      const userUseCaseStub = makeUserUseCaseStub();
      const apiClientStub = makeApiClientStub();
      const stateManagementStub = makeStateManagementStub();
      const { result } = renderHook(() => useRouter());

      const setAuthTokenSpy = jest.spyOn(apiClientStub, 'setAuthToken');
      let signInContext: any;

      render(
        <AuthContextProvider
          authUseCase={authUseCaseStub}
          userUseCase={userUseCaseStub}
          apiClient={apiClientStub}
          stateManagement={stateManagementStub}
          router={result.current}
        >
          <AuthContextConsumer>
            {({ signIn }) => {
              signInContext = signIn;

              return (
                <div data-testid="div-test-id">
                  <span>Some text here</span>
                </div>
              );
            }}
          </AuthContextConsumer>
        </AuthContextProvider>
      );

      await act(async () => {
        await signInContext('valid email', 'valid password');
      });

      expect(setAuthTokenSpy).toBeCalledWith('valid token');
    });

    it('should call setAuthToken on the stateManagement', async () => {
      const authUseCaseStub = makeAuthUseCaseStub();
      const userUseCaseStub = makeUserUseCaseStub();
      const apiClientStub = makeApiClientStub();
      const stateManagementStub = makeStateManagementStub();
      const { result } = renderHook(() => useRouter());

      const setAuthTokenSpy = jest.spyOn(stateManagementStub, 'setAuthToken');
      let signInContext: any;

      render(
        <AuthContextProvider
          authUseCase={authUseCaseStub}
          userUseCase={userUseCaseStub}
          apiClient={apiClientStub}
          stateManagement={stateManagementStub}
          router={result.current}
        >
          <AuthContextConsumer>
            {({ signIn }) => {
              signInContext = signIn;

              return (
                <div data-testid="div-test-id">
                  <span>Some text here</span>
                </div>
              );
            }}
          </AuthContextConsumer>
        </AuthContextProvider>
      );

      await act(async () => {
        await signInContext('valid email', 'valid password');
      });

      expect(setAuthTokenSpy).toBeCalledWith('valid token');
    });

    it('should set user data after signIn', async () => {
      const authUseCaseStub = makeAuthUseCaseStub();
      const userUseCaseStub = makeUserUseCaseStub();
      const apiClientStub = makeApiClientStub();
      const stateManagementStub = makeStateManagementStub();
      const { result } = renderHook(() => useRouter());

      let signInContext: any;
      let userData: User | null = null;

      render(
        <AuthContextProvider
          authUseCase={authUseCaseStub}
          userUseCase={userUseCaseStub}
          apiClient={apiClientStub}
          stateManagement={stateManagementStub}
          router={result.current}
        >
          <AuthContextConsumer>
            {({ signIn, user }) => {
              signInContext = signIn;
              userData = user;

              return (
                <div data-testid="div-test-id">
                  <span>Some text here</span>
                </div>
              );
            }}
          </AuthContextConsumer>
        </AuthContextProvider>
      );

      await act(async () => {
        await signInContext('valid email', 'valid password');
      });

      expect(userData).toEqual({
        id: 1,
        name: 'valid name',
        email: 'valid email',
        avatar: 'valid avatar'
      });
    });

    it('should set isAuthenticated to true after signIn', async () => {
      const authUseCaseStub = makeAuthUseCaseStub();
      const userUseCaseStub = makeUserUseCaseStub();
      const apiClientStub = makeApiClientStub();
      const stateManagementStub = makeStateManagementStub();
      const { result } = renderHook(() => useRouter());

      let signInContext: any;
      let isAuthenticatedContext = false;

      render(
        <AuthContextProvider
          authUseCase={authUseCaseStub}
          userUseCase={userUseCaseStub}
          apiClient={apiClientStub}
          stateManagement={stateManagementStub}
          router={result.current}
        >
          <AuthContextConsumer>
            {({ signIn, isAuthenticated }) => {
              signInContext = signIn;
              isAuthenticatedContext = isAuthenticated;

              return (
                <div data-testid="div-test-id">
                  <span>Some text here</span>
                </div>
              );
            }}
          </AuthContextConsumer>
        </AuthContextProvider>
      );

      await act(async () => {
        await signInContext('valid email', 'valid password');
      });

      expect(isAuthenticatedContext).toBe(true);
    });
  });

  describe('signOut', () => {
    it('should call removeAuthToken from apiClient after signOut', async () => {
      const authUseCaseStub = makeAuthUseCaseStub();
      const userUseCaseStub = makeUserUseCaseStub();
      const apiClientStub = makeApiClientStub();
      const stateManagementStub = makeStateManagementStub();
      const { result } = renderHook(() => useRouter());

      const removeAuthTokenSpy = jest.spyOn(apiClientStub, 'removeAuthToken');
      let signOutContext: any;

      render(
        <AuthContextProvider
          authUseCase={authUseCaseStub}
          userUseCase={userUseCaseStub}
          apiClient={apiClientStub}
          stateManagement={stateManagementStub}
          router={result.current}
        >
          <AuthContextConsumer>
            {({ signOut }) => {
              signOutContext = signOut;

              return (
                <div data-testid="div-test-id">
                  <span>Some text here</span>
                </div>
              );
            }}
          </AuthContextConsumer>
        </AuthContextProvider>
      );

      await actTestRender(async () => {
        await signOutContext();
      });

      expect(removeAuthTokenSpy).toBeCalled();
    });

    it('should call removeAuthToken from stateManagement after signOut', async () => {
      const authUseCaseStub = makeAuthUseCaseStub();
      const userUseCaseStub = makeUserUseCaseStub();
      const apiClientStub = makeApiClientStub();
      const stateManagementStub = makeStateManagementStub();
      const { result } = renderHook(() => useRouter());

      const removeAuthTokenSpy = jest.spyOn(
        stateManagementStub,
        'removeAuthToken'
      );
      let signOutContext: any;

      render(
        <AuthContextProvider
          authUseCase={authUseCaseStub}
          userUseCase={userUseCaseStub}
          apiClient={apiClientStub}
          stateManagement={stateManagementStub}
          router={result.current}
        >
          <AuthContextConsumer>
            {({ signOut }) => {
              signOutContext = signOut;

              return (
                <div data-testid="div-test-id">
                  <span>Some text here</span>
                </div>
              );
            }}
          </AuthContextConsumer>
        </AuthContextProvider>
      );

      await actTestRender(async () => {
        await signOutContext();
      });

      expect(removeAuthTokenSpy).toBeCalled();
    });

    it('should remover user data after signOut', async () => {
      const authUseCaseStub = makeAuthUseCaseStub();
      const userUseCaseStub = makeUserUseCaseStub();
      const apiClientStub = makeApiClientStub();
      const stateManagementStub = makeStateManagementStub();
      const { result } = renderHook(() => useRouter());

      let userData: User | null = null;
      let signOutContext: any;

      render(
        <AuthContextProvider
          authUseCase={authUseCaseStub}
          userUseCase={userUseCaseStub}
          apiClient={apiClientStub}
          stateManagement={stateManagementStub}
          router={result.current}
        >
          <AuthContextConsumer>
            {({ signOut, user }) => {
              signOutContext = signOut;
              userData = user;

              return (
                <div data-testid="div-test-id">
                  <span>Some text here</span>
                </div>
              );
            }}
          </AuthContextConsumer>
        </AuthContextProvider>
      );

      await actTestRender(async () => {
        await signOutContext();
      });

      expect(userData).toBe(null);
    });

    it('should push route to the home page after signOut', async () => {
      const authUseCaseStub = makeAuthUseCaseStub();
      const userUseCaseStub = makeUserUseCaseStub();
      const apiClientStub = makeApiClientStub();
      const stateManagementStub = makeStateManagementStub();
      const { result } = renderHook(() => useRouter());

      const routerMock = result.current;
      const pushSpy = jest.spyOn(routerMock, 'push');
      let signOutContext: any;

      render(
        <AuthContextProvider
          authUseCase={authUseCaseStub}
          userUseCase={userUseCaseStub}
          apiClient={apiClientStub}
          stateManagement={stateManagementStub}
          router={routerMock}
        >
          <AuthContextConsumer>
            {({ signOut, user }) => {
              signOutContext = signOut;

              return (
                <div data-testid="div-test-id">
                  <span>Some text here</span>
                </div>
              );
            }}
          </AuthContextConsumer>
        </AuthContextProvider>
      );

      await actTestRender(async () => {
        await signOutContext();
      });

      expect(pushSpy).toBeCalledWith('/');
    });
  });

  describe('useEffect - startup', () => {
    it('should not call apiClient setAuthToken if no token is saved', () => {
      const authUseCaseStub = makeAuthUseCaseStub();
      const userUseCaseStub = makeUserUseCaseStub();
      const apiClientStub = makeApiClientStub();
      const stateManagementStub = makeStateManagementStub();
      const { result } = renderHook(() => useRouter());

      jest.spyOn(stateManagementStub, 'getAuthToken').mockReturnValueOnce('');
      const setAuthTokenSpy = jest.spyOn(apiClientStub, 'setAuthToken');

      render(
        <AuthContextProvider
          authUseCase={authUseCaseStub}
          userUseCase={userUseCaseStub}
          apiClient={apiClientStub}
          stateManagement={stateManagementStub}
          router={result.current}
        >
          <AuthContextConsumer>
            {() => {
              return (
                <div data-testid="div-test-id">
                  <span>Some text here</span>
                </div>
              );
            }}
          </AuthContextConsumer>
        </AuthContextProvider>
      );

      expect(setAuthTokenSpy).not.toBeCalled();
    });

    it('should call apiClient setAuthToken if the token returned by stateManagement', async () => {
      const authUseCaseStub = makeAuthUseCaseStub();
      const userUseCaseStub = makeUserUseCaseStub();
      const apiClientStub = makeApiClientStub();
      const stateManagementStub = makeStateManagementStub();
      const { result } = renderHook(() => useRouter());

      jest
        .spyOn(stateManagementStub, 'getAuthToken')
        .mockReturnValueOnce('valid token');
      const setAuthTokenSpy = jest.spyOn(apiClientStub, 'setAuthToken');

      const { getByText } = render(
        <AuthContextProvider
          authUseCase={authUseCaseStub}
          userUseCase={userUseCaseStub}
          apiClient={apiClientStub}
          stateManagement={stateManagementStub}
          router={result.current}
        >
          <AuthContextConsumer>
            {({ user }) => {
              return (
                <div data-testid="div-test-id">
                  <span>{user?.name}</span>
                </div>
              );
            }}
          </AuthContextConsumer>
        </AuthContextProvider>
      );

      await waitFor(() => getByText('valid name'));

      expect(setAuthTokenSpy).toBeCalledWith('valid token');
    });

    it('should call userUseCase findByToken if the token returned by stateManagement', async () => {
      const authUseCaseStub = makeAuthUseCaseStub();
      const userUseCaseStub = makeUserUseCaseStub();
      const apiClientStub = makeApiClientStub();
      const stateManagementStub = makeStateManagementStub();
      const { result } = renderHook(() => useRouter());

      jest
        .spyOn(stateManagementStub, 'getAuthToken')
        .mockReturnValueOnce('valid token');
      const findByTokenSpy = jest.spyOn(userUseCaseStub, 'findByToken');

      const { getByText } = render(
        <AuthContextProvider
          authUseCase={authUseCaseStub}
          userUseCase={userUseCaseStub}
          apiClient={apiClientStub}
          stateManagement={stateManagementStub}
          router={result.current}
        >
          <AuthContextConsumer>
            {({ user }) => {
              return (
                <div data-testid="div-test-id">
                  <span>{user?.name}</span>
                </div>
              );
            }}
          </AuthContextConsumer>
        </AuthContextProvider>
      );

      await waitFor(() => getByText('valid name'));

      expect(findByTokenSpy).toBeCalledWith('valid token');
    });

    it('should set user to null and isAuthenticated to false if findByToken throws', async () => {
      const authUseCaseStub = makeAuthUseCaseStub();
      const userUseCaseStub = makeUserUseCaseStub();
      const apiClientStub = makeApiClientStub();
      const stateManagementStub = makeStateManagementStub();
      const { result } = renderHook(() => useRouter());

      jest
        .spyOn(stateManagementStub, 'getAuthToken')
        .mockReturnValueOnce('valid token');
      jest.spyOn(userUseCaseStub, 'findByToken').mockImplementationOnce(
        () =>
          new Promise((resolve, reject) => {
            reject(new Error('Test throw'));
          })
      );

      let userContext = null;
      let isAuthenticatedContext = true;

      const { getByTestId } = render(
        <AuthContextProvider
          authUseCase={authUseCaseStub}
          userUseCase={userUseCaseStub}
          apiClient={apiClientStub}
          stateManagement={stateManagementStub}
          router={result.current}
        >
          <AuthContextConsumer>
            {({ user, isAuthenticated }) => {
              userContext = user;
              isAuthenticatedContext = isAuthenticated;

              return (
                <div data-testid="div-test-id">
                  <span>{user?.name}</span>
                </div>
              );
            }}
          </AuthContextConsumer>
        </AuthContextProvider>
      );

      await waitFor(() => getByTestId('div-test-id'));

      expect(userContext).toBe(null);
      expect(isAuthenticatedContext).toBe(false);
    });

    it('should call stateManagement removeAuthToken if findByToken throws', async () => {
      const authUseCaseStub = makeAuthUseCaseStub();
      const userUseCaseStub = makeUserUseCaseStub();
      const apiClientStub = makeApiClientStub();
      const stateManagementStub = makeStateManagementStub();
      const { result } = renderHook(() => useRouter());

      jest
        .spyOn(stateManagementStub, 'getAuthToken')
        .mockReturnValueOnce('valid token');
      const removeAuthTokenSpy = jest.spyOn(
        stateManagementStub,
        'removeAuthToken'
      );

      jest.spyOn(userUseCaseStub, 'findByToken').mockImplementationOnce(
        () =>
          new Promise((resolve, reject) => {
            reject(new Error('Test throw'));
          })
      );

      const { getByTestId } = render(
        <AuthContextProvider
          authUseCase={authUseCaseStub}
          userUseCase={userUseCaseStub}
          apiClient={apiClientStub}
          stateManagement={stateManagementStub}
          router={result.current}
        >
          <AuthContextConsumer>
            {() => {
              return (
                <div data-testid="div-test-id">
                  <span>test</span>
                </div>
              );
            }}
          </AuthContextConsumer>
        </AuthContextProvider>
      );

      await waitFor(() => getByTestId('div-test-id'));

      expect(removeAuthTokenSpy).toBeCalled();
    });

    it('should call apiClient removeAuthToken if findByToken throws', async () => {
      const authUseCaseStub = makeAuthUseCaseStub();
      const userUseCaseStub = makeUserUseCaseStub();
      const apiClientStub = makeApiClientStub();
      const stateManagementStub = makeStateManagementStub();
      const { result } = renderHook(() => useRouter());

      jest
        .spyOn(stateManagementStub, 'getAuthToken')
        .mockReturnValueOnce('valid token');

      const removeAuthTokenSpy = jest.spyOn(apiClientStub, 'removeAuthToken');

      jest.spyOn(userUseCaseStub, 'findByToken').mockImplementationOnce(
        () =>
          new Promise((resolve, reject) => {
            reject(new Error('Test throw'));
          })
      );

      const { getByTestId } = render(
        <AuthContextProvider
          authUseCase={authUseCaseStub}
          userUseCase={userUseCaseStub}
          apiClient={apiClientStub}
          stateManagement={stateManagementStub}
          router={result.current}
        >
          <AuthContextConsumer>
            {() => {
              return (
                <div data-testid="div-test-id">
                  <span>test</span>
                </div>
              );
            }}
          </AuthContextConsumer>
        </AuthContextProvider>
      );

      await waitFor(() => getByTestId('div-test-id'));

      expect(removeAuthTokenSpy).toBeCalled();
    });
  });
});
