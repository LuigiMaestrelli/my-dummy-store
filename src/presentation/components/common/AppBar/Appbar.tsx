import Link from 'next/link';
import { useRouter } from 'next/router';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Offset, SearchBar, Avatar } from './components';

import styles from './AppBar.module.css';

export function AppBar() {
  const router = useRouter();

  const handleSearch = (value: string) => {
    value = encodeURI(value);
    router.push(`/search/${value}`);
  };

  return (
    <>
      <MuiAppBar position="fixed">
        <Toolbar>
          <Link href={'/'} passHref>
            <Typography variant="h6" component="div" className={styles.title}>
              My Dummy Store
            </Typography>
          </Link>
          <SearchBar onSearch={handleSearch} />
          <Box sx={{ flexGrow: 1 }} />
          <Avatar />
        </Toolbar>
      </MuiAppBar>
      <Offset className={styles.appBar} />
    </>
  );
}
