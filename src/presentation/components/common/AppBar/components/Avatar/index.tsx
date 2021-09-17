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
  const { isAuthenticated, user, signOut, openLoginDialog } = useAuthContext();

  const handleMenu = async (event: any) => {
    if (isAuthenticated) {
      setAnchorEl(event.currentTarget);
    } else {
      openLoginDialog();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    router.push('/user');
  };

  const handleSignOut = async () => {
    handleClose();
    await signOut();
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-app-bar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {isAuthenticated ? (
          <MuiAvatar alt={user?.name} src={user?.avatar} />
        ) : (
          <AccountCircle sx={{ fontSize: 40 }} />
        )}
      </IconButton>

      <Menu
        id="menu-app-bar"
        keepMounted
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </div>
  );
}
