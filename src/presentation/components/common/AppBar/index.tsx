import Link from 'next/link';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Offset, SearchBar, Avatar } from './components';

import styles from './AppBar.module.css';

export function AppBar() {
  return (
    <>
      <MuiAppBar position="fixed" data-testid="app-bar">
        <Toolbar>
          <Link href={'/'} passHref>
            <Typography variant="h6" component="div" className={styles.title}>
              My Dummy Store
            </Typography>
          </Link>
          <SearchBar />
          <div className={styles.bar} />
          <Avatar />
        </Toolbar>
      </MuiAppBar>
      <Offset className={styles.appBar} data-testid="app-bar-offset" />
    </>
  );
}
