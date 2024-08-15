import React from 'react'
import { AddItemForm } from 'components/AddItemForm/AddItemForm'
import { EditableSpan } from 'components/EditableSpan/EditableSpan'
import { Task } from './task/Task'
import { changeTodolistTitle, removeTodolist, TodolistDomainType } from '../../model/todolistsSlice'
import { addTask, fetchTasks, selectFilteredTasks } from '../../model/tasksSlice'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'app/store'
import { FilterTasksButton } from './filterTasksButton/FilterTasksButton'

type PropsType = {
  todolist: TodolistDomainType
  demo?: boolean
}

export const Todolist = ({ demo = false, ...props }: PropsType) => {
  const dispatch = useAppDispatch()

  let tasksForTodolist = useAppSelector((state) => selectFilteredTasks(state, props.todolist.filter, props.todolist.id))

  React.useEffect(() => {
    if (demo) {
      return
    }
    const thunk = fetchTasks(props.todolist.id)
    dispatch(thunk)
  }, [])

  const addTaskHandler = (title: string) => {
    dispatch(addTask({ title, todolistId: props.todolist.id }))
  }

  const removeTodolistHandler = () => {
    dispatch(removeTodolist(props.todolist.id))
  }
  const changeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitle({ id: props.todolist.id, title }))
  }

  return (
    <div>
      <h3>
        <EditableSpan value={props.todolist.title} onChange={changeTodolistTitleHandler} />
        <IconButton onClick={removeTodolistHandler} disabled={props.todolist.entityStatus === 'loading'}>
          <Delete />
        </IconButton>
      </h3>

      <AddItemForm addItem={addTaskHandler} disabled={props.todolist.entityStatus === 'loading'} />

      <div>
        {tasksForTodolist && tasksForTodolist.map((t) => <Task key={t.id} task={t} todolistId={props.todolist.id} />)}
      </div>

      <div style={{ paddingTop: '10px' }}>
        <FilterTasksButton todolist={props.todolist} />
      </div>
    </div>
  )
}
