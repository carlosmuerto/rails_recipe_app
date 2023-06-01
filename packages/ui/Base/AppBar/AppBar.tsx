import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import Link from 'next/link'
import * as AuthSlice from '../../Redux/Auth/AuthSlice'
import { useRouter } from 'next/navigation'
import { parseCookies, destroyCookie } from 'nookies'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../Redux/store'
import { useEffect, useState } from 'react'
import loadingStatus from '../../Redux/reduxConst'

interface HeaderPage {
  title: string
  href: string
}

const pages: HeaderPage[] = [
  { title: 'My Ingredients', href: '/ingredients' },
  { title: 'My Recipes', href: '/recipes' },
  { title: 'Public Recipes', href: '/ingredients' },
]

const BaseAppBar = () => {
  const AuthState = useSelector((state: RootState) => state.Auth)
  const dispatch = useDispatch<AppDispatch>()

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const router = useRouter()

  useEffect(() => {
    switch (AuthState.loading) {
      case loadingStatus.idle:
        const cookies = parseCookies()
        if (cookies.Authorization) {
          dispatch(AuthSlice.load(cookies.Authorization))
        } else {
          router.replace('/login')
        }
        break

      case loadingStatus.failed:
        router.replace('/login')
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AuthState.loading])

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MenuBookIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Recipe
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography
                    component={Link}
                    href={page.href}
                    textAlign="center"
                    sx={{
                      textDecoration: 'none',
                    }}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <MenuBookIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => {
                  handleCloseNavMenu()
                  router.replace(page.href)
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {AuthState.loading === loadingStatus.succeeded && AuthState.user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={AuthState.user.name}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                  handleCloseUserMenu()
                  if (AuthState.user) {
                    dispatch(AuthSlice.logOut(AuthState.user.token))
                    destroyCookie(null, 'Authorization')
                    router.replace('/')
                  }
                }}>
                  <Typography textAlign="center">
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default BaseAppBar
