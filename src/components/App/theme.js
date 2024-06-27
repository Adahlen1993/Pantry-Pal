import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Green for freshness
    },
    secondary: {
      main: '#ffeb3b', // Yellow for energy and vibrancy
    },
    background: {
      default: '#ffffff', // White background for clean look
      paper: '#f5f5f5', // Slightly off-white for cards and papers
    },
    text: {
      primary: '#333333', // Dark text for readability
      secondary: '#757575', // Grey for secondary text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      color: '#333333',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#333333',
    },
    body1: {
      fontSize: '1rem',
      color: '#333333',
    },
    // Add more typography settings as needed
  },
  spacing: 8, // Default spacing is 8px
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
        containedPrimary: {
          backgroundColor: '#4caf50',
          '&:hover': {
            backgroundColor: '#388e3c',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#4caf50',
        },
      },
    },
  },
});

export default theme;
