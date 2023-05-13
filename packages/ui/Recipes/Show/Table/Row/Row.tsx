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
import { useRouter } from 'next/navigation'

type RecipesTableRowProps = {
  id: string
}

const RecipesTableRow = ({ id }: RecipesTableRowProps) => {
  const food = useMemo(() => Recipe.MockUp.find((e) => e.id === id), [id])
  const router = useRouter();

  if (!food) {
    return null
  }

  const handleShow = () => {
    router.push(`Recipes/${id.toString()}`)
  }

  const handleDelete = () => {
    console.log(`Delete ${food.name}`)
  }

  const handleEdit = () => {
    console.log(`edit ${food.name}`)
  }

  return (
    <CustomTableRow key={food.id}>
      <TableCell component="th" scope="row">
        {food.name}
      </TableCell>
      <ActionsCell
        handleShow={handleShow}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </CustomTableRow>
  )
}

RecipesTableRow.propTypes = {
  id: PropTypes.string.isRequired,
}

export default RecipesTableRow