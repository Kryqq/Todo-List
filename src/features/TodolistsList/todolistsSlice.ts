import { todolistsAPI, TodolistType } from 'api/todolists-api'
import { RequestStatusType, setAppStatus } from 'app/appSlice'
import { handleServerNetworkError } from 'utils/error-utils'
import { AppThunk } from 'app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

const slice = createSlice({
  name: 'todolists',
  initialState: [] as TodolistDomainType[],
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((tl: TodolistDomainType) => tl.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({ ...action.payload.todolist, entityStatus: 'idle', filter: 'all' })
    },

    changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const index = state.findIndex((tl: TodolistDomainType) => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    },
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((tl: TodolistDomainType) => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; status: RequestStatusType }>) => {
      const todolist = state.find((tl: TodolistDomainType) => tl.id === action.payload.id)
      if (todolist) {
        todolist.entityStatus = action.payload.status
      }
    },
    setTodolists: (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
      // return action.payload.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
      action.payload.todolists.forEach((tl) => state.push({ ...tl, filter: 'all', entityStatus: 'idle' }))
    },
    clearLogoutData: (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
      state.splice(0, state.length)
    },
  },
})

export const todolistsReducer = slice.reducer
export const {
  removeTodolist,
  addTodolist,
  changeTodolistTitle,
  changeTodolistFilter,
  changeTodolistEntityStatus,
  setTodolists,
  clearLogoutData
} = slice.actions

// export const _todolistsReducer = (
//   state: Array<TodolistDomainType> = initialState,
//   action: ActionsType,
// ): Array<TodolistDomainType> => {
//   switch (action.type) {
//     case 'REMOVE-TODOLIST':
//       return state.filter((tl) => tl.id != action.id)
//     case 'ADD-TODOLIST':
//       return [{ ...action.todolist, filter: 'all', entityStatus: 'idle' }, ...state]

//     case 'CHANGE-TODOLIST-TITLE':
//       return state.map((tl) => (tl.id === action.id ? { ...tl, title: action.title } : tl))
//     case 'CHANGE-TODOLIST-FILTER':
//       return state.map((tl) => (tl.id === action.id ? { ...tl, filter: action.filter } : tl))
//     case 'CHANGE-TODOLIST-ENTITY-STATUS':
//       return state.map((tl) => (tl.id === action.id ? { ...tl, entityStatus: action.status } : tl))
//     case 'SET-TODOLISTS':
//       return action.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
//     default:
//       return state
//   }
// }

// export const removeTodolistAC = (id: string) => ({ type: 'REMOVE-TODOLIST', id }) as const
// export const addTodolistAC = (todolist: TodolistType) => ({ type: 'ADD-TODOLIST', todolist }) as const
// export const changeTodolistTitleAC = (id: string, title: string) =>
//   ({
//     type: 'CHANGE-TODOLIST-TITLE',
//     id,
//     title,
//   }) as const
// export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
//   ({
//     type: 'CHANGE-TODOLIST-FILTER',
//     id,
//     filter,
//   }) as const
// export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) =>
//   ({
//     type: 'CHANGE-TODOLIST-ENTITY-STATUS',
//     id,
//     status,
//   }) as const
// export const setTodolistsAC = (todolists: Array<TodolistType>) => ({ type: 'SET-TODOLISTS', todolists }) as const

export const fetchTodolistsTC = (): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    todolistsAPI
      .getTodolists()
      .then((res) => {
        dispatch(setTodolists({ todolists: res.data }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      })
      .catch((error) => {
        handleServerNetworkError(dispatch, error)
      })
  }
}
export const removeTodolistTC = (id: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))

    dispatch(changeTodolistEntityStatus({ id, status: 'loading' }))
    todolistsAPI.deleteTodolist(id).then((res) => {
      dispatch(removeTodolist({ id }))

      dispatch(setAppStatus({ status: 'succeeded' }))
    })
  }
}
export const addTodolistTC = (title: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(addTodolist({ todolist: res.data.data.item }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    })
  }
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
  return (dispatch) => {
    todolistsAPI.updateTodolist(id, title).then((res) => {
      dispatch(changeTodolistTitle({ id: id, title: title }))
    })
  }
}

// export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
// export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
// export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
// type ActionsType =
//   | RemoveTodolistActionType
//   | AddTodolistActionType
//   | ReturnType<typeof changeTodolistTitleAC>
//   | ReturnType<typeof changeTodolistFilterAC>
//   | SetTodolistsActionType
//   | ReturnType<typeof changeTodolistEntityStatusAC>
