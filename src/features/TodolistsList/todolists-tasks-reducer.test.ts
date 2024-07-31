import { addTodolist, TodolistDomainType, todolistsReducer } from './todolistsSlice'
import { tasksReducer, TasksStateType } from './tasksSlice'
import { TodolistType } from './todolists-api'
import { TestAction } from 'common/types/types'

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodolistDomainType> = []

  let todolist: TodolistType = {
    title: 'new todolist',
    id: 'any id',
    addedDate: '',
    order: 0,
  }

  type Action = TestAction<typeof addTodolist.fulfilled>
  const action: Action = {
    type: addTodolist.fulfilled.type,
    payload: {
      todolist,
    },
  }

  //   const action = addTodolist({ todolist })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
