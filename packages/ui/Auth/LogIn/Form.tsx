import { useForm, SubmitHandler } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Fragment, useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import axios from 'axios'
import { BASE_URL } from '../const'
import { useSelector, useDispatch } from 'react-redux'
import type { AppDispatch, RootState } from '../../Redux/store'
import * as AuthSlice from '../../Redux/Auth/AuthSlice'
import loadingStatus from '../../Redux/reduxConst'
import { FormHelperText } from '@mui/material'

const AuthLogInFormSchema = object({
  email: string().nonempty('Email is required').email('Email is invalid'),
  password: string()
    .nonempty('Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
})

type AuthLogInFormInput = TypeOf<typeof AuthLogInFormSchema>

const AuthLogInForm = () => {
  const AuthState = useSelector((state: RootState) => state.Auth)
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    setError,
    handleSubmit,
  } = useForm<AuthLogInFormInput>({
    resolver: zodResolver(AuthLogInFormSchema),
  })

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful])

  const onSubmitHandler: SubmitHandler<AuthLogInFormInput> = async (values) => {
    dispatch(AuthSlice.logIn({ email: values.email, password: values.password }));
  }

  return (
    <Fragment>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Typography>{AuthState.user.userName}</Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmitHandler)}
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          autoComplete="email"
          autoFocus
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
          autoComplete="current-password"
          required
          error={!!errors['password']}
          helperText={errors['password'] ? errors['password'].message : ''}
          {...register('password')}
        />

        <FormHelperText error={!!AuthState.alert.red}>
          {AuthState.alert.red ? AuthState.alert.red : ''}
        </FormHelperText>

        <LoadingButton
          variant="contained"
          fullWidth
          type="submit"
          loading={AuthState.loading === loadingStatus.pending}
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoadingButton>
        <Grid container>
          <Grid item xs>
            {/* <Link href="#" variant="body2">
              Forgot password?
            </Link> */}
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  )
}

export default AuthLogInForm
