import { changeTodolistTitle, removeTodolist, TodolistDomainType } from 'features/TodolistsList/model/todolistsSlice'
import { Delete } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import { EditableSpan } from 'components/EditableSpan/EditableSpan'
import { useAppDispatch } from 'hooks/useAppDispatch'

type Props = {
  todolist: TodolistDomainType
}

export const TodolistTitle = (props: Props) => {
  const dispatch = useAppDispatch()
  const removeTodolistHandler = () => {
    dispatch(removeTodolist(props.todolist.id))
  }
  const changeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitle({ id: props.todolist.id, title }))
  }
  return (
    <h3>
      <EditableSpan value={props.todolist.title} onChange={changeTodolistTitleHandler} />
      <IconButton onClick={removeTodolistHandler} disabled={props.todolist.entityStatus === 'loading'}>
        <Delete />
      </IconButton>
    </h3>
  )
}
