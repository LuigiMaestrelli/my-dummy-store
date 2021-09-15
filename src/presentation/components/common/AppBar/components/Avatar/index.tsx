import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MuiAvatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { useAuthContext } from '@/main/contexts/authContext';

export function Avatar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated, user, signOut, signIn } = useAuthContext();

  const handleMenu = async (event: any) => {
    if (isAuthenticated) {
      setAnchorEl(event.currentTarget);
    } else {
      // TODO: Login screen
      await signIn('teste@teste.com', 'teste');
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await signOut();
    setAnchorEl(null);
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
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </div>
  );
}
