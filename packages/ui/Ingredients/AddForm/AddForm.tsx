import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Fragment, useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import * as Ingredient from '../Ingredient'

const AddFormSchema = z.object({
  ingredient_id: z.number(),
  quantity: z.number().nonnegative(),
})

type AddFormInput = z.TypeOf<typeof AddFormSchema>

const AddForm = () => {
  const [loading, setLoading] = useState(false)
  const [selectedIngedient, setSelectedIngedient] = useState<Ingredient.itr>()
  const [quantity, setQuantity] = useState<number>(0.0);

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
    control,
    setValue,
    getValues,
  } = useForm<AddFormInput>({
    resolver: zodResolver(AddFormSchema),
  })

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful])

  const onSubmitHandler: SubmitHandler<AddFormInput> = (values) => {
    console.log(values)
  }
  // console.log(errors)

  return (
    <Fragment>
      <Typography component="h1" variant="h5">
        Add Ingredint
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmitHandler)}
        sx={{ mt: 1 }}
      >
        <Controller
          control={control}
          name={'ingredient_id'}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <Autocomplete
              disablePortal
              options={Ingredient.MockUp}
              fullWidth
              getOptionLabel={(option) => `${option.name} ( ${option.unit} )`}
              onBlur={onBlur} // notify when input is touched
              onChange={(event, value) => {
                onChange(value?.id ?? undefined)
                setSelectedIngedient(value ?? undefined)
              }} // send value to hook form
              renderInput={(params) => <TextField {...params} label="Food" />}
              //
            />
          )}
        />

        

        <TextField
          margin="normal"
          fullWidth
          id=""
          label="Quantity"
          placeholder="Quantity"
          type="text"
          inputMode="numeric"
          error={!!errors['quantity']}
          helperText={errors['quantity'] ? errors['quantity'].message : ''}
          {...register('quantity', {
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

export default AddForm