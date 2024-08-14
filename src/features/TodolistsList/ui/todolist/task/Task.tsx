import React from 'react'
import { Checkbox, IconButton } from '@mui/material'
import { EditableSpan } from 'components/EditableSpan/EditableSpan'
import { Delete } from '@mui/icons-material'
import { TaskStatuses } from 'common/types/enums/enums'
import { TaskType } from 'features/TodolistsList/api/tasksAPI.types'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { removeTask, updateTask } from 'features/TodolistsList/model/tasksSlice'

type Props = {
  task: TaskType
  todolistId: string
}

export const Task = (props: Props) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(removeTask({ taskId: props.task.id, todolistId: props.todolistId }))
  }

  const changeTaskStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    dispatch(
      updateTask({
        taskId: props.task.id,
        model: { status },
        todolistId: props.todolistId,
      }),
    )
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(
      updateTask({
        taskId: props.task.id,
        model: { title },
        todolistId: props.todolistId,
      }),
    )
  }
  let checked = props.task.status === TaskStatuses.Completed

  return (
    <div key={props.task.id} className={checked ? 'is-done' : ''}>
      <Checkbox checked={checked} color="primary" onChange={changeTaskStatusHandler} />

      <EditableSpan value={props.task.title} onChange={changeTaskTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  )
}
