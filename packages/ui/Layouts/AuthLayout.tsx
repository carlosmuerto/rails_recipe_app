import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import PropTypes from 'prop-types'
import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Fragment } from 'react'
import ThemeProviderLayout from './ThemeProviderLayout'

const propTypes = {
  children: PropTypes.element.isRequired,
}
type AuthLayoutnProps = PropTypes.InferProps<typeof propTypes>

const AuthLayout = ({ children }: AuthLayoutnProps) => {
  return (
    <ThemeProviderLayout>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          {children}
        </Box>
      </Container>
    </ThemeProviderLayout>
  )
}

AuthLayout.propTypes = propTypes

export default AuthLayout
