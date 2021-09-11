import React from 'react';
import Link from 'next/link';
import styled from '@mui/system/styled';
import { ThemeOptions } from '@mui/material/styles/createTheme';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import styles from './AppBar.module.css';

type OffsetType = {
  theme?: ThemeOptions;
};

const Offset = styled('div')(({ theme }: OffsetType) => theme?.mixins?.toolbar);

export function AppBar() {
  return (
    <>
      <MuiAppBar position="fixed">
        <Toolbar>
          <Link href={'/'} passHref>
            <Typography variant="h6" component="div" className={styles.title}>
              My Dummy Store
            </Typography>
          </Link>
        </Toolbar>
      </MuiAppBar>
      <Offset className={styles.appBar} />
    </>
  );
}
