import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import PropTypes from 'prop-types'
import { Fragment } from 'react'
import * as Theme from '../Theme'
import AppBar from '../Widgets/AppBar'
import Copyright from '../Widgets/Copyright'

const propTypes = {
  children: PropTypes.element.isRequired,
}
type BaseLayoutnProps = PropTypes.InferProps<typeof propTypes>

const BaseLayout = ({ children }: BaseLayoutnProps) => {
  return (
    <Theme.Provider>
      <Fragment>
        <AppBar />
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
    </Theme.Provider>
  )
}

BaseLayout.propTypes = propTypes

export default BaseLayout
