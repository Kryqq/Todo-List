import { TaskType } from 'features/TodolistsList/api/tasksAPI.types'
import { TodolistDomainType } from 'features/TodolistsList/model/todolistsSlice'
import React from 'react'
import { Task } from '../task/Task'

type Props = {
  todolist: TodolistDomainType
  tasksForTodolist: Array<TaskType>
}

export const Tasks = (props: Props) => {
  return (
    <div>
      {props.tasksForTodolist &&
        props.tasksForTodolist.map((t) => <Task key={t.id} task={t} todolistId={props.todolist.id} />)}
    </div>
  )
}
