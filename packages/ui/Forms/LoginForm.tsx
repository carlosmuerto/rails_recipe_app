import {
  Box,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab'

const loginSchema = object({
  email: string().nonempty('Email is required').email('Email is invalid'),
  password: string()
    .nonempty('Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
})

type LoginInput = TypeOf<typeof loginSchema>

const LoginForm = () => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful])

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    console.log(values)
  }
  console.log(errors)

  return (
    <Box sx={{ maxWidth: '30rem' }}>
      <Typography variant="h4" component="h1" sx={{ mb: '2rem' }}>
        Login
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <TextField
          sx={{ mb: 2 }}
          label="Email"
          fullWidth
          required
          type="email"
          error={!!errors['email']}
          helperText={errors['email'] ? errors['email'].message : ''}
          {...register('email')}
        />
        <TextField
          sx={{ mb: 2 }}
          label="Password"
          fullWidth
          required
          type="password"
          error={!!errors['password']}
          helperText={errors['password'] ? errors['password'].message : ''}
          {...register('password')}
        />

        <LoadingButton
          variant="contained"
          fullWidth
          type="submit"
          loading={loading}
          sx={{ py: '0.8rem', mt: '1rem' }}
        >
          Register
        </LoadingButton>
      </Box>
    </Box>
  )
}

export {
  LoginForm
}
