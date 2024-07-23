import { addTodolist, clearLogoutData, removeTodolist, setTodolists } from './todolistsSlice'
import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from 'api/todolists-api'
import { Dispatch } from 'redux'
import { AppRootStateType, AppThunk } from 'app/store'
import { setAppStatus } from 'app/appSlice'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: TasksStateType = {}

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {
    removeTask: (state, action: PayloadAction<{ todolistId: string; taskId: string }>) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index > -1) {
        tasks.splice(index, 1)
      }
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    },
    updateTask: (
      state,
      action: PayloadAction<{ taskId: string; model: UpdateDomainTaskModelType; todolistId: string }>,
    ) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    },
    setTasks: (state, action: PayloadAction<{ tasks: TaskType[]; todolistId: string }>) => {
      state[action.payload.todolistId] = action.payload.tasks
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodolist, (state, action) => {
      state[action.payload.todolist.id] = []
    }),
      builder.addCase(removeTodolist, (state, action) => {
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
  },
})

export const tasksReducer = slice.reducer
export const { setTasks, removeTask, addTask, updateTask } = slice.actions
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

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  todolistsAPI.getTasks(todolistId).then((res) => {
    const tasks = res.data.items
    dispatch(setTasks({ tasks, todolistId }))
    dispatch(setAppStatus({ status: 'succeeded' }))
  })
}
export const removeTaskTC =
  (taskId: string, todolistId: string): AppThunk =>
  (dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
      const action = removeTask({ taskId, todolistId })
      dispatch(action)
    })
  }
export const addTaskTC =
  (title: string, todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    todolistsAPI
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const task = res.data.data.item
          const action = addTask({ task })
          dispatch(action)
          dispatch(setAppStatus({ status: 'succeeded' }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((error) => {
        handleServerNetworkError(dispatch, error)
      })
  }
export const updateTaskTC =
  (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk =>
  (dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find((t) => t.id === taskId)
    if (!task) {
      console.warn('task not found in the state')
      return
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel,
    }

    todolistsAPI
      .updateTask(todolistId, taskId, apiModel)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const action = updateTask({ taskId, model: domainModel, todolistId })
          dispatch(action)
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((error) => {
        handleServerNetworkError(dispatch, error)
      })
  }

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}
// type ActionsType =
//   | ReturnType<typeof removeTaskAC>
//   | ReturnType<typeof addTaskAC>
//   | ReturnType<typeof updateTaskAC>
//   | AddTodolistActionType
//   | RemoveTodolistActionType
//   | SetTodolistsActionType
//   | ReturnType<typeof setTasksAC>
//   | any