import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../Widgets/Copyright';

const propTypes = {
  children: PropTypes.element.isRequired
};

type ThemeProviderLayoutProps = PropTypes.InferProps<typeof propTypes>;

const theme = createTheme();

const ThemeProviderLayout = ({ children }:ThemeProviderLayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

ThemeProviderLayout.propTypes = propTypes;

export default ThemeProviderLayout
