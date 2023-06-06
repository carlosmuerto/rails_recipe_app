import { useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as Ingredient from '../../model'
import { Row as IngredientRow } from './Row';

interface Props {
  ingredients: Ingredient.TYPE[];
}

const IngredientsList = ({ ingredients }: Props) => {
  // Use useMemo to avoid recalculating the ingredient rows on every render
  const ingredientRows = useMemo(
    () =>
      ingredients.map((ingdnt: Ingredient.TYPE) => (
        <IngredientRow key = {ingdnt.id} {...ingdnt} />
      )),
    [ingredients]
  );

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Ingredient</TableCell>
            <TableCell align="right">price</TableCell>
            <TableCell align="right">quantity</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{ingredientRows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default IngredientsList;