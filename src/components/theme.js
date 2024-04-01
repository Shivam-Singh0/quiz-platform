import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    customWarningColor: {
      main: '#ff6d6d',
    },
    light: {
      main: '#e3e8df',
    },
    purple: {
      main: '#9c27b0',
    },
    customSelected: {
      main: '#43ff64d9'
    }

  },
  shape: {
    borderRadius: '23px', // Making the button round
  },
 
});

export default theme;
