import { tasksReducer } from 'features/TodolistsList/model/tasksSlice'
import { todolistsReducer } from 'features/TodolistsList/model/todolistsSlice'

import { appReducer } from './appSlice'

import { configureStore, UnknownAction } from '@reduxjs/toolkit'
import { authReducer } from 'features/auth/model/authSlice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: { tasks: tasksReducer, todolists: todolistsReducer, app: appReducer, auth: authReducer },
})

export type AppRootStateType = ReturnType<typeof store.getState>

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>

// export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector