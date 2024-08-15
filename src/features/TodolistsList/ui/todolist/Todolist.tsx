import React from 'react'
import { AddItemForm } from 'components/AddItemForm/AddItemForm'
import { EditableSpan } from 'components/EditableSpan/EditableSpan'
import { Task } from './task/Task'
import {
  changeTodolistFilter,
  changeTodolistTitle,
  removeTodolist,
  TodolistDomainType,
} from '../../model/todolistsSlice'
import { addTask, fetchTasks, selectFilteredTasks } from '../../model/tasksSlice'
import { Button, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { TaskStatuses } from 'common/types/enums/enums'
import { useAppSelector } from 'app/store'

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

  const onAllClickHandler = () => {
    dispatch(changeTodolistFilter({ filter: 'all', id: props.todolist.id }))
  }

  const onActiveClickHandler = () => {
    dispatch(changeTodolistFilter({ filter: 'active', id: props.todolist.id }))
  }

  const onCompletedClickHandler = () => {
    dispatch(changeTodolistFilter({ filter: 'completed', id: props.todolist.id }))
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
        <Button
          variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
          onClick={onAllClickHandler}
          color={'inherit'}
        >
          All
        </Button>
        <Button
          variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
          onClick={onActiveClickHandler}
          color={'primary'}
        >
          Active
        </Button>
        <Button
          variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
          onClick={onCompletedClickHandler}
          color={'secondary'}
        >
          Completed
        </Button>
      </div>
    </div>
  )
}
