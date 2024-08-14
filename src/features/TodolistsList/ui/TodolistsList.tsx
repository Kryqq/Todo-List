import React from 'react'
import {
  addTodolist,
  changeTodolistFilter,
  changeTodolistTitle,
  fetchTodolists,
  FilterValuesType,
  removeTodolist,
  TodolistDomainType,
} from '../model/todolistsSlice'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useSelector } from 'react-redux'
import { AppRootStateType } from 'app/store'
import { addTask, removeTask, updateTask } from '../model/tasksSlice'
import { Navigate } from 'react-router-dom'
import Grid from '@mui/material/Grid/Grid'
import { AddItemForm } from 'components/AddItemForm/AddItemForm'
import Paper from '@mui/material/Paper/Paper'

import { TaskStatuses } from 'common/types/enums/enums'
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

  const removeTaskHandler = React.useCallback(function (id: string, todolistId: string) {
    dispatch(removeTask({ taskId: id, todolistId }))
  }, [])

  const addTaskHandler = React.useCallback(function (title: string, todolistId: string) {
    const thunk = addTask({ title, todolistId })
    dispatch(thunk)
  }, [])



  const changeFilter = React.useCallback(function (value: FilterValuesType, todolistId: string) {
    const action = changeTodolistFilter({ id: todolistId, filter: value })
    dispatch(action)
  }, [])

  const removeTodolistHandler = React.useCallback(function (id: string) {
    const thunk = removeTodolist(id)
    dispatch(thunk)
  }, [])

  const changeTodolistTitleHandler = React.useCallback(function (id: string, title: string) {
    const thunk = changeTodolistTitle({ id, title })
    dispatch(thunk)
  }, [])

  const addTodolistHandler = React.useCallback(
    (title: string) => {
      const thunk = addTodolist(title)
      dispatch(thunk)
    },
    [dispatch],
  )

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
                <Todolist
                  todolist={tl}
                  changeFilter={changeFilter}
                  addTaskHandler={addTaskHandler}
                  removeTodolistHandler={removeTodolistHandler}
                  changeTodolistTitle={changeTodolistTitleHandler}
                  demo={demo}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
