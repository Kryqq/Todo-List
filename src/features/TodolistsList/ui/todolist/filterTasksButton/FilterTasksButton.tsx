import Button from '@mui/material/Button'
import { changeTodolistFilter, TodolistDomainType } from 'features/TodolistsList/model/todolistsSlice'
import { useAppDispatch } from 'hooks/useAppDispatch'
import React from 'react'

type Props = {
  todolist: TodolistDomainType
}

export const FilterTasksButton = (props: Props) => {
	
  const dispatch = useAppDispatch()

  const filterTasksHandler = (filter: 'all' | 'active' | 'completed') => {
    dispatch(changeTodolistFilter({ filter, id: props.todolist.id }))
  }

  return (
    <>
      <Button
        variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
        onClick={() => filterTasksHandler('all')}
        color={'inherit'}
      >
        All
      </Button>
      <Button
        variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
        onClick={() => filterTasksHandler('active')}
        color={'primary'}
      >
        Active
      </Button>
      <Button
        variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
        onClick={() => filterTasksHandler('completed')}
        color={'secondary'}
      >
        Completed
      </Button>
    </>
  )
}
