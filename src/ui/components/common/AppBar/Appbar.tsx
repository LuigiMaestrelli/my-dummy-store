import React from 'react';

import { styled } from '@mui/system';
import { AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';

import styles from './AppBar.module.css';

const Offset = styled('div')(({ theme }: any) => theme.mixins.toolbar);

export function AppBar() {
  return (
    <>
      <MuiAppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div">
            My Dummy Store
          </Typography>
        </Toolbar>
      </MuiAppBar>
      <Offset className={styles.appBar} />
    </>
  );
}
