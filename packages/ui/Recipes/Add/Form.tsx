import { useEffect, useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as Recipe from '../model';
import { zodResolver } from '@hookform/resolvers/zod';

const RecipeAddForm = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>('');

  const {
    control,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
    setValue,
  } = useForm<Recipe.INTERFACE>({
    resolver: zodResolver(Recipe.schema),
    defaultValues: {
      id: null,
      name: '',
      description: '',
      isPublic: false,
      cookingTimeSeconds:0,
      preparationTimeSeconds:0,
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (values:Recipe.INTERFACE) => {
    await new Promise((resolve) => setTimeout(resolve, 2500));
    console.log(values)
  }

  const onSubmitHandler: SubmitHandler<Recipe.INTERFACE> = async (values) => {
    try {
      setLoading(true);
      // Make a request to add the Ingredient using the values
    await onSubmit(values);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Add Recipe
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmitHandler)}
        sx={{ mt: 1 }}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              label="Name"
              placeholder="Name"
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              multiline
              rows={4}
              label="Description"
              placeholder="Description"
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ''}
            />
          )}
        />

        <Controller
          name="isPublic"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              label="isPublic"
              control={<Checkbox {...field} />}
            />
          )}
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
    </>
  );
};

export default RecipeAddForm;