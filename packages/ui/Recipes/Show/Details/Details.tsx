import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import * as Recipe from '../../model'

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

const RecipeDetails: React.FC<Recipe.INTERFACE> = ({
  name,
  description,
  isPublic,
  preparationTimeSeconds,
  cookingTimeSeconds,
}) => {
  return (
    <Card>
      <RecipeHeader name={name} isPublic={isPublic} />
      <RecipeContent
        description={description}
        preparationTimeSeconds={preparationTimeSeconds}
        cookingTimeSeconds={cookingTimeSeconds}
      />
    </Card>
  );
};

export default RecipeDetails;