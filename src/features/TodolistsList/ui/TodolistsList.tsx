import React from 'react'
import { addTodolist, fetchTodolists, TodolistDomainType } from '../model/todolistsSlice'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useSelector } from 'react-redux'
import { AppRootStateType } from 'app/store'
import { Navigate } from 'react-router-dom'
import Grid from '@mui/material/Grid/Grid'
import { AddItemForm } from 'components/AddItemForm/AddItemForm'
import Paper from '@mui/material/Paper/Paper'
import { Todolist } from './todolist/Todolist'

type PropsType = {
  demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>((state) => state.todolists)

  const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (demo || !isLoggedIn) {
      return
    }
    const thunk = fetchTodolists()
    dispatch(thunk)
  }, [])

  const addTodolistHandler = (title: string) => {
    return dispatch(addTodolist(title))
  }

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <Grid container style={{ padding: '20px' }}>
        <AddItemForm addItem={addTodolistHandler} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: '10px' }}>
                <Todolist todolist={tl} demo={demo} />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
