import TableCell from '@mui/material/TableCell'
import Box from '@mui/material/Box'
import TableRow from '@mui/material/TableRow'
import PropTypes from 'prop-types'
import Fab from '@mui/material/Fab'
import SearchIcon from '@mui/icons-material/Search'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import * as Recipe from '../../../model'

const propTypes = {
  id: PropTypes.number.isRequired,
}
type RecipesTableRowProps = PropTypes.InferProps<typeof propTypes>

const RecipesTableRow = ({ id }: RecipesTableRowProps) => {
  const food = Recipe.MockUp.find((e) => e.id === id)
  if (food) {
    const handleShow = () => {
      console.log(`Show ${food.name}`)
    }

    const handleDelete = () => {
      console.log(`Delete ${food.name}`)
    }

    const handleEdit = () => {
      console.log(`edit ${food.name}`)
    }

    return (
      <TableRow
        key={food.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {food.id}
        </TableCell>
        <TableCell component="th" scope="row">
          {food.name}
        </TableCell>
        {/* <TableCell align="right">
          {Recipe.parsePricePerUnit(food)}
        </TableCell>
        <TableCell align="right">
          {Recipe.parseQuantityUnit(food)}
        </TableCell> */}
        <TableCell align="right">
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab color="primary" aria-label="add" onClick={handleShow}>
              <SearchIcon />
            </Fab>
            <Fab color="secondary" aria-label="edit" onClick={handleEdit}>
              <EditIcon />
            </Fab>
            <Fab color="error" aria-label="edit" onClick={handleDelete}>
              <DeleteForeverIcon />
            </Fab>
          </Box>
        </TableCell>
      </TableRow>
    )
  } else {
    return <div></div>
  }
}

RecipesTableRow.propTypes = propTypes

export default RecipesTableRow
