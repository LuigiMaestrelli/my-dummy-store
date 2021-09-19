import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import mockRouter from 'next-router-mock';

import { Avatar } from '@/presentation/components/common/AppBar/components';
import * as authContext from '@/main/contexts/authContext';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('AppBar - Avatar Component', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/initial');
  });

  it('should render the search bar component', () => {
    const renderResult = render(<Avatar />);
    expect(renderResult.baseElement).toBeInTheDocument();
  });

  it('should render the default user icon if the user is not logged in', () => {
    jest.spyOn(authContext, 'useAuthContext').mockReturnValueOnce({
      isAuthenticated: false,
      user: null,
      signOut: async () => {},
      signIn: async () => {},
      openSignInDialog: () => {}
    });

    render(<Avatar />);

    const userIcon = screen.queryByTestId('user-avatar-default-user-icon');
    expect(userIcon).toBeInTheDocument();
  });

  it('should not render the user avatar if the user is not logged in', () => {
    jest.spyOn(authContext, 'useAuthContext').mockReturnValueOnce({
      isAuthenticated: false,
      user: null,
      signOut: async () => {},
      signIn: async () => {},
      openSignInDialog: () => {}
    });

    render(<Avatar />);

    const userIcon = screen.queryByTestId('user-avatar-user-photo');
    expect(userIcon).not.toBeInTheDocument();
  });

  it('should not render the default user icon if the user is logged in', () => {
    jest.spyOn(authContext, 'useAuthContext').mockReturnValueOnce({
      isAuthenticated: true,
      user: null,
      signOut: async () => {},
      signIn: async () => {},
      openSignInDialog: () => {}
    });

    render(<Avatar />);

    const userIcon = screen.queryByTestId('user-avatar-default-user-icon');
    expect(userIcon).not.toBeInTheDocument();
  });

  it('should render the user avatar if the user is logged in', () => {
    jest.spyOn(authContext, 'useAuthContext').mockReturnValueOnce({
      isAuthenticated: true,
      user: null,
      signOut: async () => {},
      signIn: async () => {},
      openSignInDialog: () => {}
    });

    render(<Avatar />);

    const userIcon = screen.queryByTestId('user-avatar-user-photo');
    expect(userIcon).toBeInTheDocument();
  });

  it('should render the user avatar with the url provided by auth context', () => {
    jest.spyOn(authContext, 'useAuthContext').mockReturnValueOnce({
      isAuthenticated: true,
      user: {
        id: 1,
        name: 'fake name',
        email: 'fake e-mail',
        avatar: 'https://valid_url'
      },
      signOut: async () => {},
      signIn: async () => {},
      openSignInDialog: () => {}
    });

    render(<Avatar />);

    const userIcon = screen.getByTestId('user-avatar-user-photo');
    const img = userIcon.querySelector('img');

    const avatarSrc = img?.getAttribute('src');
    expect(avatarSrc).toBe('https://valid_url');
  });

  it('should render the user avatar with the alt provided by auth context', () => {
    jest.spyOn(authContext, 'useAuthContext').mockReturnValueOnce({
      isAuthenticated: true,
      user: {
        id: 1,
        name: 'fake name',
        email: 'fake e-mail',
        avatar: 'https://valid_url'
      },
      signOut: async () => {},
      signIn: async () => {},
      openSignInDialog: () => {}
    });

    render(<Avatar />);

    const userIcon = screen.getByTestId('user-avatar-user-photo');
    const img = userIcon.querySelector('img');

    const avatarAlt = img?.getAttribute('alt');
    expect(avatarAlt).toBe('fake name');
  });

  it('should call openSignInDialog on click on the avar if the user is not logged in', () => {
    const openSignInDialog = jest.fn();
    jest.spyOn(authContext, 'useAuthContext').mockReturnValueOnce({
      isAuthenticated: false,
      user: null,
      signOut: async () => {},
      signIn: async () => {},
      openSignInDialog
    });

    render(<Avatar />);

    const userBtn = screen.getByTestId('user-avatar-btn');
    fireEvent.click(userBtn);

    expect(openSignInDialog).toBeCalled();
  });

  it('should open the menu if the user is logged in', () => {
    jest.spyOn(authContext, 'useAuthContext').mockReturnValue({
      isAuthenticated: true,
      user: {
        id: 1,
        name: 'fake name',
        email: 'fake e-mail',
        avatar: 'https://valid_url'
      },
      signOut: async () => {},
      signIn: async () => {},
      openSignInDialog: () => {}
    });

    render(<Avatar />);

    const userBtn = screen.getByTestId('user-avatar-btn');
    fireEvent.click(userBtn);

    const menu = screen.getByTestId('menu-app-bar');
    expect(menu).toBeVisible();
  });

  it('should call signOut on click on the avatar menu - Sign Out', () => {
    const signOut = jest.fn();
    jest.spyOn(authContext, 'useAuthContext').mockReturnValueOnce({
      isAuthenticated: false,
      user: null,
      signOut,
      signIn: async () => {},
      openSignInDialog: () => {}
    });

    render(<Avatar />);

    const userBtn = screen.getByTestId('user-avatar-btn');
    fireEvent.click(userBtn);

    const menuItemSignOut = screen.getByTestId('menu-app-bar-sign-out');
    fireEvent.click(menuItemSignOut);

    expect(signOut).toBeCalled();
  });

  it('should open user route on the avatar menu - Profile', () => {
    jest.spyOn(authContext, 'useAuthContext').mockReturnValueOnce({
      isAuthenticated: false,
      user: null,
      signOut: async () => {},
      signIn: async () => {},
      openSignInDialog: () => {}
    });

    render(<Avatar />);

    const userBtn = screen.getByTestId('user-avatar-btn');
    fireEvent.click(userBtn);

    const menuItemProfile = screen.getByTestId('menu-app-bar-profile');
    fireEvent.click(menuItemProfile);

    expect(mockRouter.asPath).toBe('/user');
  });
});
