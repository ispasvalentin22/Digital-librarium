import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Progress() {
  return (
    <Box sx={{ mx: 75, my: 10 }}>
      <CircularProgress size={80} />
    </Box>
  );
}