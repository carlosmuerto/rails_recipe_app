import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import * as Recipe from '../../../model'
import { RecipesTableRow } from './Row'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../Redux/store'
import * as RecipesPublicSlice from '../../../../Redux/Recipes/Public/RecipesPublicSlice'
import React, { useEffect } from 'react'
import loadingStatus from '../../../../Redux/reduxConst'
import { boolean } from 'zod'

const RecipesPublicList = () => {
  const RecipesPublicState = useSelector((state: RootState) => state.RecipesPublic)
  const AuthState = useSelector((state: RootState) => state.Auth)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (AuthState.loading === loadingStatus.succeeded && AuthState.user)
    switch (RecipesPublicState.loading) {
      case loadingStatus.idle:
        dispatch(RecipesPublicSlice.fetch(AuthState.user.token))
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AuthState.loading, RecipesPublicState.loading, RecipesPublicState.list])

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
            RecipesPublicState.list.map((recipe) => {
              return (
                <RecipesTableRow key={recipe.id} recipe={recipe}/>
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RecipesPublicList
