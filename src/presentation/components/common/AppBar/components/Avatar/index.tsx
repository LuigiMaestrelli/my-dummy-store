import { useState } from 'react';
import { useRouter } from 'next/router';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MuiAvatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { useAuthContext } from '@/main/contexts/authContext';

export function Avatar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const { isAuthenticated, user, signOut, openSignInDialog } = useAuthContext();

  const handleMenu = async (event: any) => {
    if (isAuthenticated) {
      setAnchorEl(event.currentTarget);
    } else {
      openSignInDialog();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = async () => {
    handleClose();
    await router.push('/user');
  };

  const handleSignOut = async () => {
    handleClose();
    await signOut();
  };

  return (
    <div data-testid="user-avatar">
      <IconButton
        data-testid="user-avatar-btn"
        size="large"
        aria-label="account of current user"
        aria-controls="menu-app-bar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {isAuthenticated ? (
          <MuiAvatar
            data-testid="user-avatar-user-photo"
            alt={user?.name}
            src={user?.avatar}
          />
        ) : (
          <AccountCircle
            data-testid="user-avatar-default-user-icon"
            sx={{ fontSize: 40 }}
          />
        )}
      </IconButton>

      <Menu
        id="menu-app-bar"
        data-testid="menu-app-bar"
        keepMounted
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem data-testid="menu-app-bar-profile" onClick={handleProfile}>
          Profile
        </MenuItem>
        <MenuItem data-testid="menu-app-bar-sign-out" onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </Menu>
    </div>
  );
}
