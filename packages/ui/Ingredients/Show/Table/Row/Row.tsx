import TableCell from '@mui/material/TableCell'
import Box from '@mui/material/Box'
import TableRow from '@mui/material/TableRow'
import PropTypes from 'prop-types'
import Fab from '@mui/material/Fab'
import SearchIcon from '@mui/icons-material/Search'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import * as Ingredient from '../../../model'

const IngredientsTableRow = ({ id, name, unit, price_per_unit, quantity }: Ingredient.TYPE) => {

  
  const handleShow = () => {
    console.log(`Show ${name}`)
  }

  const handleDelete = () => {
    console.log(`Delete ${name}`)
  }

  const handleEdit = () => {
    console.log(`edit ${name}`)
  }


  return (
    <TableRow
      key={id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="right">
        {Ingredient.parsePricePerUnit(price_per_unit,unit)}
      </TableCell>
      <TableCell align="right">
        {Ingredient.parseQuantityUnit(quantity,unit)}
      </TableCell>
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
}

export default IngredientsTableRow
