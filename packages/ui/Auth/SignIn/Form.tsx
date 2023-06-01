import { useForm, SubmitHandler } from 'react-hook-form'
import { literal, object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Fragment, useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { useRouter } from 'next/navigation'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormHelperText from '@mui/material/FormHelperText'
import axios from 'axios'
import { BASE_URL } from '../const'
import { AppDispatch, RootState } from '../../Redux/store'
import { useDispatch, useSelector } from 'react-redux'
import * as AuthSlice from '../../Redux/Auth/AuthSlice'
import loadingStatus from '../../Redux/reduxConst'
import { parseCookies, setCookie } from 'nookies'

const AuthSignInFromSchema = object({
  name: string()
    .nonempty('Name is required')
    .max(32, 'Name must be less than 100 characters'),
  email: string().nonempty('Email is required').email('Email is invalid'),
  password: string()
    .nonempty('Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().nonempty('Please confirm your password'),
  terms: literal(true, {
    invalid_type_error: 'Accept Terms is required',
  }),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
})

type AuthSignInFromInput = TypeOf<typeof AuthSignInFromSchema>

const AuthSignInFrom = () => {
  const AuthState = useSelector((state: RootState) => state.Auth)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    setError,
    reset,
    handleSubmit,
  } = useForm<AuthSignInFromInput>({
    resolver: zodResolver(AuthSignInFromSchema),
  })

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful])

  useEffect(() => {
    switch (AuthState.loading) {
      case loadingStatus.idle:
        // console.log(parseCookies())
        break
      case loadingStatus.succeeded:
        // set the cookie with the token
        if (typeof window !== 'undefined' && AuthState.user) {
          setCookie(null, 'Authorization', AuthState.user.token.split(' ')[1], {
            path: '/',
            domain: window.location.hostname,
            secure: true,
            sameSite: 'strict',
          })
          router.replace('/recipes')
        }

        // console.log(parseCookies())

        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AuthState.loading])

  const onSubmitHandler: SubmitHandler<AuthSignInFromInput> = async (
    values,
  ) => {
    dispatch(
      AuthSlice.signUp({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    )
  }

  return (
    <Fragment>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmitHandler)}
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          fullWidth
          id="name"
          label="Full Name"
          placeholder="Full Name"
          autoComplete="name"
          autoFocus
          required
          {...register('name')}
          error={!!errors['name']}
          helperText={errors['name'] ? errors['name'].message : ''}
        />
        <TextField
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          placeholder="Email Address"
          autoComplete="email"
          required
          {...register('email')}
          error={!!errors['email']}
          helperText={errors['email'] ? errors['email'].message : ''}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          id="password"
          placeholder="Password"
          autoComplete="new-password"
          required
          error={!!errors['password']}
          helperText={errors['password'] ? errors['password'].message : ''}
          {...register('password')}
        />
        <TextField
          margin="normal"
          fullWidth
          label="passwordConfirm"
          type="password"
          id="passwordConfirm"
          placeholder="password Confirm"
          autoComplete="new-password"
          required
          error={!!errors['passwordConfirm']}
          helperText={
            errors['passwordConfirm'] ? errors['passwordConfirm'].message : ''
          }
          {...register('passwordConfirm')}
        />

        <FormGroup>
          <FormControlLabel
            control={<Checkbox required />}
            {...register('terms')}
            label={
              <Typography color={errors['terms'] ? 'error' : 'inherit'}>
                Accept Terms and Conditions
              </Typography>
            }
          />
          <FormHelperText error={!!errors['terms']}>
            {errors['terms'] ? errors['terms'].message : ''}
            {AuthState.alert.red ? AuthState.alert.red : ''}
          </FormHelperText>
        </FormGroup>

        <LoadingButton
          variant="contained"
          fullWidth
          type="submit"
          loading={AuthState.loading === loadingStatus.pending}
          sx={{ mt: 3, mb: 2 }}
        >
          SIGN UP
        </LoadingButton>
        <Grid container>
          <Grid item xs></Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {'Already have an account? Sign in'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  )
}

export default AuthSignInFrom
