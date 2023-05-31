import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import PropTypes from 'prop-types'
import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import * as Theme from '../../Base/Theme'
import Copyright from '../../Base/Copyright'
import { store } from '../../Redux/store'
import { Provider } from 'react-redux'

const propTypes = {
  children: PropTypes.element.isRequired,
}
type AuthLayoutnProps = PropTypes.InferProps<typeof propTypes>

const AuthLayout = ({ children }: AuthLayoutnProps) => {
  return (
    <Provider store={store}>
      <Theme.Provider>
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
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Box>
        </Container>
      </Theme.Provider>
    </Provider>
  )
}

AuthLayout.propTypes = propTypes

export default AuthLayout
