import { addTask, removeTask, fetchTasks, tasksReducer, TasksStateType, updateTask } from '../tasksSlice'
import { addTodolist, removeTodolist, setTodolists } from '../todolistsSlice'
import { TaskPriorities, TaskStatuses } from 'common/types/enums/enums'
import { TestAction } from 'common/types/types'
import { TodolistType } from '../../api/todolistAPI'

let startState: TasksStateType = {}
beforeEach(() => {
  startState = {
    ['todolistId1']: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    ['todolistId2']: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  }
})

test('correct task should be deleted from correct array', () => {
  type Action = TestAction<typeof removeTask.fulfilled>

  const action: Action = {
    type: removeTask.fulfilled.type,
    payload: {
      taskId: '2',
      todolistId: 'todolistId2',
    },
  }

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(2)
  expect(endState['todolistId2'].every((t) => t.id != '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {
  type Action = TestAction<typeof addTask.fulfilled>
  const action: Action = {
    type: addTask.fulfilled.type,
    payload: {
      task: {
        todoListId: 'todolistId2',
        title: 'juce',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: 0,
        startDate: '',
        id: 'id exists',
      },
    },
  }

  //   const _action = addTask({
  //     task: {
  //       todoListId: 'todolistId2',
  //       title: 'juce',
  //       status: TaskStatuses.New,
  //       addedDate: '',
  //       deadline: '',
  //       description: '',
  //       order: 0,
  //       priority: 0,
  //       startDate: '',
  //       id: 'id exists',
  //     },
  //   })

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juce')
  expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})
test('status of specified task should be changed', () => {
  type Action = TestAction<typeof updateTask.fulfilled>
  const action: Action = {
    type: updateTask.fulfilled.type,
    payload: {
      taskId: '2',
      model: { status: TaskStatuses.New },
      todolistId: 'todolistId2',
    },
  }

  const _action = updateTask({ taskId: '2', model: { status: TaskStatuses.New }, todolistId: 'todolistId2' })

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})
test('title of specified task should be changed', () => {
  type Action = TestAction<typeof updateTask.fulfilled>
  const action: Action = {
    type: updateTask.fulfilled.type,
    payload: {
      taskId: '2',
      model: { title: 'yogurt' },
      todolistId: 'todolistId2',
    },
  }

  //   const _action = updateTask({ taskId: '2', model: { title: 'yogurt' }, todolistId: 'todolistId2' })

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'][1].title).toBe('JS')
  expect(endState['todolistId2'][1].title).toBe('yogurt')
  expect(endState['todolistId2'][0].title).toBe('bread')
})

test('new array should be added when new todolist is added', () => {
  type Action = TestAction<typeof addTodolist.fulfilled>

  const action: Action = {
    type: addTodolist.fulfilled.type,
    payload: {
      todolist: {
        id: 'blablas',
        title: 'new todolist',
        order: 0,
        addedDate: '',
      },
    },
  }

  //   const action = addTodolist({ todolist: { id: 'blablas', title: 'new todolist', order: 0, addedDate: '' } })

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  const newKey = keys.find((k) => k != 'todolistId1' && k != 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})
test('propertry with todolistId should be deleted', () => {
  type Action = TestAction<typeof removeTodolist.fulfilled>
  const action: Action = {
    type: removeTodolist.fulfilled.type,
    payload: {
      id: 'todolistId2',
    },
  }
  //   const action = removeTodolist({ id: 'todolistId2' })

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})

test('empty arrays should be added when we set todolists', () => {
  const todolists: Array<TodolistType> = [
    { id: '1', title: 'title 1', order: 0, addedDate: '' },
    { id: '2', title: 'title 2', order: 0, addedDate: '' },
  ]
  const action = setTodolists({ todolists: todolists })

  const endState = tasksReducer({}, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState['1']).toBeDefined()
  expect(endState['2']).toBeDefined()
})
test('tasks should be added for todolist', () => {
  type Action = TestAction<typeof fetchTasks.fulfilled>

  const action: Action = {
    type: fetchTasks.fulfilled.type,
    payload: {
      tasks: startState['todolistId1'],
      todolistId: 'todolistId1',
    },
  }

  //   type _Action = {
  //     type: string
  //     payload: {
  //       tasks: Array<TaskType>
  //       todolistId: string
  //     }
  //   }
  //   const _action = fetchTasks.fulfilled(
  //     { tasks: startState['todolistId1'], todolistId: 'todolistId1' },
  //     'requestId',
  //     'todolistId1',
  //   )

  const endState = tasksReducer(
    {
      todolistId2: [],
      todolistId1: [],
    },
    action,
  )

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(0)
})
