import CssBaseline from '@mui/material/CssBaseline';
import PropTypes from 'prop-types'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const propTypes = {
  children: PropTypes.element.isRequired
};

type BaseThemeProviderProps = PropTypes.InferProps<typeof propTypes>;

const theme = createTheme();

const BaseThemeProvider = ({ children }:BaseThemeProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

BaseThemeProvider.propTypes = propTypes;

export default BaseThemeProvider
