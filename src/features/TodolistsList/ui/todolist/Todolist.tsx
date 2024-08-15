import React from 'react'
import { AddItemForm } from 'components/AddItemForm/AddItemForm'
import { TodolistDomainType } from '../../model/todolistsSlice'
import { addTask, fetchTasks, selectFilteredTasks } from '../../model/tasksSlice'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'app/store'
import { FilterTasksButton } from './filterTasksButton/FilterTasksButton'
import { Tasks } from './tasks/Tasks'
import { TodolistTitle } from './todolistTitle/TodolistTitle'

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
    return dispatch(addTask({ title, todolistId: props.todolist.id }))
  }

  return (
    <div>
      <TodolistTitle todolist={props.todolist} />

      <AddItemForm addItem={addTaskHandler} disabled={props.todolist.entityStatus === 'loading'} />

      <Tasks tasksForTodolist={tasksForTodolist} todolist={props.todolist} />

      <div style={{ paddingTop: '10px' }}>
        <FilterTasksButton todolist={props.todolist} />
      </div>
    </div>
  )
}
