import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import * as Recipe from '../../model'
import { Row } from './Row'

interface Props {
  recipesList: Recipe.INTERFACE[];
}

const RecipesList = ({ recipesList }: Props) => {

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Recipe</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            recipesList.map((recipe) => recipe.id ? (
            <Row key={recipe.id} id={recipe.id} />
            ) : null)
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RecipesList
