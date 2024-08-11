import React from 'react'
import { AddItemForm } from 'components/AddItemForm/AddItemForm'
import { EditableSpan } from 'components/EditableSpan/EditableSpan'
import { Task } from './Task/Task'

import { FilterValuesType, TodolistDomainType } from '../todolistsSlice'
import { fetchTasks, selectFilteredTasks } from '../tasksSlice'
import { Button, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { TaskStatuses } from 'common/types/enums/enums'
import { TaskType } from '../todolists-api'
import { useAppSelector } from 'app/store'

type PropsType = {
  todolist: TodolistDomainType

  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTaskHandler: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
  removeTaskHandler: (taskId: string, todolistId: string) => void
  removeTodolistHandler: (id: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
  demo?: boolean
}

export const Todolist = React.memo(function ({ demo = false, ...props }: PropsType) {
  const dispatch = useAppDispatch()

  let tasksForTodolist = useAppSelector((state) =>  selectFilteredTasks(state, props.todolist.filter, props.todolist.id))

  React.useEffect(() => {
    if (demo) {
      return
    }
    const thunk = fetchTasks(props.todolist.id)
    dispatch(thunk)
  }, [])

  const addTask = React.useCallback(
    (title: string) => {
      props.addTaskHandler(title, props.todolist.id)
    },
    [props.addTaskHandler, props.todolist.id],
  )

  const removeTodolist = () => {
    props.removeTodolistHandler(props.todolist.id)
  }
  const changeTodolistTitle = React.useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.todolist.id, title)
    },
    [props.todolist.id, props.changeTodolistTitle],
  )

  const onAllClickHandler = React.useCallback(
    () => props.changeFilter('all', props.todolist.id),
    [props.todolist.id, props.changeFilter],
  )
  const onActiveClickHandler = React.useCallback(
    () => props.changeFilter('active', props.todolist.id),
    [props.todolist.id, props.changeFilter],
  )
  const onCompletedClickHandler = React.useCallback(
    () => props.changeFilter('completed', props.todolist.id),
    [props.todolist.id, props.changeFilter],
  )



  return (
    <div>
      <h3>
        <EditableSpan value={props.todolist.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'} />
      <div>
        {tasksForTodolist &&
          tasksForTodolist.map((t) => (
            <Task
              key={t.id}
              task={t}
              todolistId={props.todolist.id}
              removeTask={props.removeTaskHandler}
              changeTaskTitle={props.changeTaskTitle}
              changeTaskStatus={props.changeTaskStatus}
            />
          ))}
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
})
