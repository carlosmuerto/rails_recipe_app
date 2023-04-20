import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Fragment, useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import * as Ingredient from '../model'

const RecipeAddFormSchema = z.object({
  recipe_id: z.number(),
  name: z.string().nonempty(),
})

type RecipeAddFormInput = z.TypeOf<typeof RecipeAddFormSchema>

const RecipeAddForm = () => {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState<String>('');

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
    control,
    setValue,
    getValues,
  } = useForm<RecipeAddFormInput>({
    resolver: zodResolver(RecipeAddFormSchema),
  })

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful])

  const onSubmitHandler: SubmitHandler<RecipeAddFormInput> = (values) => {
    console.log(values)
  }
  // console.log(errors)

  return (
    <Fragment>
      <Typography component="h1" variant="h5">
        Add Recipe
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
          id=""
          label="Name"
          placeholder="Name"
          type="text"
          inputMode="numeric"
          error={!!errors['name']}
          helperText={errors['name'] ? errors['name'].message : ''}
          {...register('name', {
            valueAsNumber: true,
          })}
        />

        <LoadingButton
          variant="contained"
          fullWidth
          type="submit"
          loading={loading}
          sx={{ mt: 3, mb: 2 }}
        >
          Add
        </LoadingButton>
      </Box>
    </Fragment>
  )
}

export default RecipeAddForm