import {
  addTodolist,
  changeTodolistEntityStatus,
  changeTodolistFilter,
  changeTodolistTitle,
  FilterValuesType,
  removeTodolist,
  setTodolists,
  TodolistDomainType,
  todolistsReducer,
} from './todolistsSlice'
import { v1 } from 'uuid'
import { TodolistType } from './todolists-api'
import { RequestStatusType } from 'app/appSlice'
import { TestAction } from 'common/types/types'

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  startState = [
    { id: todolistId1, title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0 },
    { id: todolistId2, title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0 },
  ]
})

test('correct todolist should be removed', () => {
  const endState = todolistsReducer(startState, removeTodolist({ id: todolistId1 }))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
  type Action = TestAction<typeof addTodolist.fulfilled>

  const action: Action = {
    type: addTodolist.fulfilled.type,
    payload: {
      todolist: {
        id: 'any id',
        title: 'New Todolist',
        order: 0,
        addedDate: '',
      },
    },
  }

  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(action.payload.todolist.title)
  expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
  let newTodolistTitle = 'New Todolist'

  const action = changeTodolistTitle({ id: todolistId2, title: newTodolistTitle })

  const endState = todolistsReducer(startState, action)

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValuesType = 'completed'

  const action = changeTodolistFilter({ id: todolistId2, filter: newFilter })

  const endState = todolistsReducer(startState, action)

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})
test('todolists should be added', () => {
  const action = setTodolists({
    todolists: [
      { id: '1', title: 'title 1', order: 0, addedDate: '' },
      { id: '2', title: 'title 2', order: 0, addedDate: '' },
    ],
  })

  const endState = todolistsReducer([], action)

  expect(endState.length).toBe(2)
})
test('correct entity status of todolist should be changed', () => {
  let newStatus: RequestStatusType = 'loading'

  const action = changeTodolistEntityStatus({ id: todolistId2, status: newStatus })

  const endState = todolistsReducer(startState, action)

  expect(endState[0].entityStatus).toBe('idle')
  expect(endState[1].entityStatus).toBe(newStatus)
})
