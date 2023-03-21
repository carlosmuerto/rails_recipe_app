import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import PropTypes from 'prop-types'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Fragment } from 'react'
import ThemeProviderLayout from './ThemeProviderLayout'
import BaseAppBar from '../Widgets/BaseAppBar'
import Copyright from '../Widgets/Copyright'

const propTypes = {
  children: PropTypes.element.isRequired,
}
type BaseLayoutnProps = PropTypes.InferProps<typeof propTypes>

const BaseLayout = ({ children }: BaseLayoutnProps) => {
  return (
    <ThemeProviderLayout>
      <Fragment>
        <BaseAppBar />
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
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Fragment>
    </ThemeProviderLayout>
  )
}

BaseLayout.propTypes = propTypes

export default BaseLayout
