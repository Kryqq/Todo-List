import { addTodolist, clearLogoutData, removeTodolist, setTodolists } from './todolistsSlice'
import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'utils/createAsyncThunk'
import { ResultCode, TaskStatuses } from 'common/types/enums/enums'
import { thunkTryCatch } from 'utils/thunkTryCatch'
import { tasksAPI } from '../api/tasksAPI'
import { TaskType, UpdateTaskModelType } from '../api/tasksAPI.types'
import { RejectAppError, RejectCatchError } from 'common/types/types'

const initialState: TasksStateType = {}

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    })
    builder.addCase(addTask.fulfilled, (state, action) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    })
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    })
    builder.addCase(addTodolist.fulfilled, (state, action) => {
      state[action.payload.todolist.id] = []
    }),
      builder.addCase(removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id]
      }),
      builder.addCase(setTodolists, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
    builder.addCase(clearLogoutData, (state, action) => {
      return {}
    })
    builder.addCase(removeTask.fulfilled, (state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index > -1) {
        tasks.splice(index, 1)
      }
    })
  },
  selectors: {
    selectTaskByTodolist: (state, todolistId: string) => state[todolistId],
    selectFilteredTasks: (state, filter, todolistId) => {
      let tasksForTodolist = state[todolistId]
      if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.New)
      }
      if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.Completed)
      }
      return tasksForTodolist
    },
  },
})

export const tasksReducer = slice.reducer
export const { selectTaskByTodolist, selectFilteredTasks } = slice.selectors

// export const _tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
//   switch (action.type) {
//     case 'REMOVE-TASK':
//       return { ...state, [action.todolistId]: state[action.todolistId].filter((t) => t.id != action.taskId) }
//     case 'ADD-TASK':
//       return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
//     case 'UPDATE-TASK':
//       return {
//         ...state,
//         [action.todolistId]: state[action.todolistId].map((t) =>
//           t.id === action.taskId ? { ...t, ...action.model } : t,
//         ),
//       }
//     case 'ADD-TODOLIST':
//       return { ...state, [action.todolist.id]: [] }
//     case 'REMOVE-TODOLIST':
//       const copyState = { ...state }
//       delete copyState[action.id]
//       return copyState
//     case 'SET-TODOLISTS': {
//       const copyState = { ...state }
//       action.todolists.forEach((tl: any) => {
//         copyState[tl.id] = []
//       })
//       return copyState
//     }
//     case 'SET-TASKS':
//       return { ...state, [action.todolistId]: action.tasks }
//     default:
//       return state
//   }
// }

// export const removeTaskAC = (taskId: string, todolistId: string) =>
//   ({ type: 'REMOVE-TASK', taskId, todolistId }) as const
// export const addTaskAC = (task: TaskType) => ({ type: 'ADD-TASK', task }) as const
// export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
//   ({ type: 'UPDATE-TASK', model, todolistId, taskId }) as const
// export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
//   ({ type: 'SET-TASKS', tasks, todolistId }) as const

export const fetchTasks = createAppAsyncThunk<{ tasks: Array<TaskType>; todolistId: string }, string>(
  `${slice.name}/fetchTasks`,
  async (todolistId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const res = await tasksAPI.getTasks(todolistId)
    try {
      const tasks = res.data.items

      return { tasks, todolistId }
    } catch (error) {
      return rejectWithValue({ error, type: 'catchError' } as RejectCatchError)
    }
  },
)

type RemoveTask = {
  taskId: string
  todolistId: string
}

export const removeTask = createAppAsyncThunk<RemoveTask, RemoveTask>(
  `${slice.name}/removeTask`,
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    const res = await tasksAPI.deleteTask(arg.todolistId, arg.taskId)
    try {
      return { taskId: arg.taskId, todolistId: arg.todolistId }
    } catch (error) {
      return rejectWithValue({ error: res.data, type: 'appError' } as RejectAppError)
    }
  },
)

export const addTask = createAppAsyncThunk<{ task: TaskType }, { title: string; todolistId: string }>(
  `${slice.name}/addTask`,
  (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await tasksAPI.createTask(arg)
      if (res.data.resultCode === ResultCode.Success) {
        const task = res.data.data.item
        return { task }
      } else {
        return rejectWithValue({ error: res.data, type: 'appError' } as RejectAppError)
      }
    })
  },
)

// export const _addTask=
//   (title: string, todolistId: string): AppThunk =>
//   (dispatch) => {
//     dispatch(setAppStatus({ status: 'loading' }))
//     todolistsAPI
//       .createTask(todolistId, title)
//       .then((res) => {
//         if (res.data.resultCode === 0) {
//           const task = res.data.data.item
//           const action = addTask({ task })
//           dispatch(action)
//           dispatch(setAppStatus({ status: 'succeeded' }))
//         } else {
//           handleServerAppError(dispatch, res.data)
//         }
//       })
//       .catch((error) => {
//         handleServerNetworkError(dispatch, error)
//       })
//   }

export type UpdateTaskArgs = {
  taskId: string
  model: Partial<UpdateTaskModelType>
  todolistId: string
}

export const updateTask = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs>(
  `${slice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI

    try {
      const task = getState().tasks[arg.todolistId].find((t) => t.id === arg.taskId)
      if (!task) {
        console.warn('task not found in the state')

        return rejectWithValue({ error: 'task not found in the state', type: 'appError' } as RejectAppError)
      }
      const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...arg.model,
      }

      const res = await tasksAPI.updateTask(arg.todolistId, arg.taskId, apiModel)
      if (res.data.resultCode === 0) {
        return arg
      } else {
        return rejectWithValue({ error: res.data, type: 'appError' } as RejectAppError)
      }
    } catch (error) {
      return rejectWithValue({ error, type: 'catchError' } as RejectCatchError)
    }
  },
)

// export const updateTask=
//   (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk =>
//   (dispatch, getState: () => AppRootStateType) => {
//     const state = getState()
//     const task = state.tasks[todolistId].find((t) => t.id === taskId)
//     if (!task) {
//       console.warn('task not found in the state')
//       return
//     }

//     const apiModel: UpdateTaskModelType = {
//       deadline: task.deadline,
//       description: task.description,
//       priority: task.priority,
//       startDate: task.startDate,
//       title: task.title,
//       status: task.status,
//       ...domainModel,
//     }

//     todolistsAPI
//       .updateTask(todolistId, taskId, apiModel)
//       .then((res) => {
//         if (res.data.resultCode === 0) {
//           const action = updateTask({ taskId, model: domainModel, todolistId })
//           dispatch(action)
//         } else {
//           handleServerAppError(dispatch, res.data)
//         }
//       })
//       .catch((error) => {
//         handleServerNetworkError(dispatch, error)
//       })
//   }

export type TasksStateType = {
  [key: string]: Array<TaskType>
}
