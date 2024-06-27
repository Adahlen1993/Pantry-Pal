import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './redux/store';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './components/App/theme';

import App from './components/App/App';


const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
      <CssBaseline />
    </Provider>
    </ThemeProvider>,
 
);

