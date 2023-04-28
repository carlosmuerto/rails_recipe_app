import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import * as Recipe from '../../model'

const RecipeDetails: React.FC<Recipe.INTERFACE> = ({
  name,
  description,
  isPublic,
  preparationTimeSeconds,
  cookingTimeSeconds,
}) => {
  return (
    <Card>
      <CardHeader title={name} subheader={isPublic ? 'Public' : 'Private'} />
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
    </Card>
  );
};

export default RecipeDetails;