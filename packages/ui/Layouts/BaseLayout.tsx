import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import PropTypes from 'prop-types'
import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Fragment } from 'react'
import ThemeProviderLayout from './ThemeProviderLayout'
import ResponsiveAppBar from './ResponsiveAppBar'

const propTypes = {
  children: PropTypes.element.isRequired,
}
type BaseLayoutnProps = PropTypes.InferProps<typeof propTypes>

const BaseLayout = ({ children }: BaseLayoutnProps) => {
  return (
    <ThemeProviderLayout>
      <Fragment>
        <ResponsiveAppBar />
        <Container component="main" maxWidth="lg">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {children}
          </Box>
        </Container>
      </Fragment>
    </ThemeProviderLayout>
  )
}

BaseLayout.propTypes = propTypes

export default BaseLayout
