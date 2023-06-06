import { useMemo } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import SearchIcon from '@mui/icons-material/Search'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import * as Recipe from '../../../../model'
import TableCell from '@mui/material/TableCell'
import CustomTableRow from './CustomTableRow'
import ActionsCell from './ActionsCell'
import { useRouter } from 'next/navigation'

type RecipesTableRowProps = {
  recipe: Recipe.INTERFACE
}

const RecipesTableRow = ({ recipe }: RecipesTableRowProps) => {
  const router = useRouter();

  const handleShow = () => {
    router.push(`recipes/${recipe.id.toString()}`)
  }

  return (
    <CustomTableRow key={recipe.id}>
      <TableCell component="th" scope="row">
        {recipe.name}
      </TableCell>
      <ActionsCell
        handleShow={handleShow}
      />
    </CustomTableRow>
  )
}

export default RecipesTableRow