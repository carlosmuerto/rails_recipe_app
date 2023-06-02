import { FC } from 'react'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import SearchIcon from '@mui/icons-material/Search'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import TableCell from '@mui/material/TableCell'

type ActionsCellProps = {
  handleShow: () => void
}

const ActionsCell: FC<ActionsCellProps> = ({ handleShow }) => (
  <TableCell align="right">
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="primary" aria-label="add" onClick={handleShow}>
        <SearchIcon />
      </Fab>
    </Box>
  </TableCell>
)

export default ActionsCell
