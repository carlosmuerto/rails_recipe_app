import { useMemo } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import SearchIcon from '@mui/icons-material/Search'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import * as Recipe from '../../../model'
import TableCell from '@mui/material/TableCell'
import CustomTableRow from './CustomTableRow'
import ActionsCell from './ActionsCell'

type RecipesTableRowProps = {
  id: string
}

const RecipesTableRow = ({ id }: RecipesTableRowProps) => {
  const food = useMemo(() => Recipe.MockUp.find((e) => e.id === id), [id])

  if (!food) {
    return null
  }

  return (
    <CustomTableRow key={food.id}>
      <TableCell component="th" scope="row">
        {food.name}
      </TableCell>
      <ActionsCell
        handleShow={() => console.log(`Show ${food.name}`)}
        handleEdit={() => console.log(`Edit ${food.name}`)}
        handleDelete={() => console.log(`Delete ${food.name}`)}
      />
    </CustomTableRow>
  )
}

RecipesTableRow.propTypes = {
  id: PropTypes.string.isRequired,
}

export default RecipesTableRow