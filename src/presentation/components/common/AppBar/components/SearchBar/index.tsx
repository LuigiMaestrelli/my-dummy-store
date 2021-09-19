import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30rem'
    }
  }
}));

export function SearchBar() {
  const [searchText, setSearchText] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const currentRoute = router.route?.toLowerCase();
    if (!currentRoute.startsWith('/search')) {
      setSearchText('');
    }
  }, [router.route]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchText) {
      router.push(`/search/${encodeURI(searchText)}`);
      event.preventDefault();
    }
  };

  return (
    <Search data-testid="app-bar-search">
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        data-testid="search-bar-input"
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={searchText}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </Search>
  );
}
