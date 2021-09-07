import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/system';

export function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.primary.main,
        padding: 1
      }}
    >
      <Typography color={theme.palette.primary.contrastText}>
        Made with 💩
      </Typography>
    </Box>
  );
}
