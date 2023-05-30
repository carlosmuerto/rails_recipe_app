import { useForm, SubmitHandler } from 'react-hook-form'
import { literal, object, string, TypeOf } from 'zod'
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
import FormGroup from '@mui/material/FormGroup'
import FormHelperText from '@mui/material/FormHelperText'
import axios from 'axios'
import { BASE_URL } from '../const'

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
  const [loading, setLoading] = useState(false)

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

  const onSubmitHandler: SubmitHandler<AuthSignInFromInput> = async (values) => {
    axios
      .post(`${BASE_URL}/signup`, {
        user: {
          name: values.name,
          email: values.email,
          password: values.password,
        },
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
          setError('root', { type: 'manual', message: error.response.data.status.message });
          
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
      .finally(function () {
        setLoading(false)
      })
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
          helperText={errors['passwordConfirm'] ? errors['passwordConfirm'].message : ''}
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
            {errors['root'] ? errors['root'].message : ''}
          </FormHelperText>
        </FormGroup>

        <LoadingButton
          variant="contained"
          fullWidth
          type="submit"
          loading={loading}
          sx={{ mt: 3, mb: 2 }}
        >
          SIGN UP
        </LoadingButton>
        <Grid container>
          <Grid item xs>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Already have an account? Sign in"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  )
}

export default AuthSignInFrom
