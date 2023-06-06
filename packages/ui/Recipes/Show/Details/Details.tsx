import React, { useEffect } from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import * as Recipe from '../../model'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../Redux/store';
import * as RecipesSlice from '../../../Redux/Recipes/RecipesSlice'
import loadingStatus from '../../../Redux/reduxConst';

interface RecipeHeaderProps {
  name: string;
  isPublic: boolean;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({ name, isPublic }) => {
  const visibility = isPublic ? 'Public' : 'Private';
  return <CardHeader title={name} subheader={visibility} />;
};

interface RecipeContentProps {
  description: string;
  preparationTimeSeconds: number;
  cookingTimeSeconds: number;
}

const RecipeContent: React.FC<RecipeContentProps> = ({
  description,
  preparationTimeSeconds,
  cookingTimeSeconds,
}) => {
  return (
    <CardContent>
      <Typography variant="body1" gutterBottom>
        Description: {description}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Preparation Time: {preparationTimeSeconds} seconds
      </Typography>
      <Typography variant="body1" gutterBottom>
        Cooking Time: {cookingTimeSeconds} seconds
      </Typography>
    </CardContent>
  );
};

interface RecipeDetailsProp {
  id: string | undefined
}


const RecipeDetails: React.FC<RecipeDetailsProp> = ({id}) => {
  const RecipesState = useSelector((state: RootState) => state.Recipes)
  const AuthState = useSelector((state: RootState) => state.Auth)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (AuthState.loading === loadingStatus.succeeded && AuthState.user)
    switch (RecipesState.loading) {
      case loadingStatus.idle:
        dispatch(RecipesSlice.fetch(AuthState.user.token))
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AuthState.loading, RecipesState.loading, RecipesState.list])

  const recipe = RecipesState.list.find((recipe) => recipe.id == id)

  if (!recipe) return null;

  return (
    <Card>
      <RecipeHeader name={recipe.name} isPublic={ recipe.isPublic} />
      <RecipeContent
        description={recipe.description}
        preparationTimeSeconds={recipe.preparationTimeSeconds}
        cookingTimeSeconds={recipe.cookingTimeSeconds}
      />
    </Card>
  );
};

export default RecipeDetails;