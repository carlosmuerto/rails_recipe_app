import { FC, ReactNode } from 'react'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

type CustomTableRowProps = {
  children: ReactNode
}

const CustomTableRow: FC<CustomTableRowProps> = ({ children }) => (
  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    {children}
  </TableRow>
)

export default CustomTableRow