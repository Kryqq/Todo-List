import { handleServerAppError } from 'utils/error-utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setAppStatus, setIsInitialized } from 'app/appSlice'
import { clearLogoutData } from 'features/TodolistsList/todolistsSlice'
import { handleServerNetworkError } from 'utils/handleServerNetworkError'
import { LoginParamsType } from '../api/authAPI.types'
import { authAPI } from '../api/authAPI'
import { createAppAsyncThunk } from 'utils/createAsyncThunk'

const initialState: InitialStateType = {
  isLoggedIn: false,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //     setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
    //       state.isLoggedIn = action.payload.isLoggedIn
    //     },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  },
})

export const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${slice.name}/initializeApp`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      const res = await authAPI.me()
      if (res.data.resultCode === 0) {
        return { isLoggedIn: true }
      } else {
        handleServerAppError(dispatch, res.data, false)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    } finally {
      dispatch(setIsInitialized({ isInitialized: true }))
    }
  },
)

// export const _authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//   switch (action.type) {
//     case 'login/SET-IS-LOGGED-IN':
//       return { ...state, isLoggedIn: action.value }
//     default:
//       return state
//   }
// }

// export const setIsLoggedInAC = (value: boolean) => ({ type: 'login/SET-IS-LOGGED-IN', value }) as const

export const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  `${slice.name}/login`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      const res = await authAPI.login(arg)
      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: 'succeeded' }))
        return { isLoggedIn: true }
      } else {
        handleServerAppError(dispatch, res.data, false)
        dispatch(setAppStatus({ status: 'failed' }))
        return rejectWithValue(res.data)
      }
    } catch (error) {
      handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    }
  },
)

// export const loginTC =
//   (data: LoginParamsType): AppThunk =>
//   (dispatch) => {
//     dispatch(setAppStatus({ status: 'loading' }))
//     authAPI
//       .login(data)
//       .then((res) => {
//         if (res.data.resultCode === 0) {
//           dispatch(setIsLoggedIn({ isLoggedIn: true }))
//           dispatch(setAppStatus({ status: 'succeeded' }))
//         } else {
//           handleServerAppError(dispatch, res.data)
//         }
//       })
//       .catch((error) => {
//         handleServerNetworkError(dispatch, error)
//       })
//   }
export const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${slice.name}/logout`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      const res = await authAPI.logout()
      if (res.data.resultCode === 0) {
        dispatch(clearLogoutData({ todolists: [] }))
        dispatch(setAppStatus({ status: 'succeeded' }))
        return { isLoggedIn: false }
      } else {
        handleServerAppError(dispatch, res.data)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    }
  },
)

// export const logoutTC = (): AppThunk => (dispatch) => {
//   dispatch(setAppStatus({ status: 'loading' }))
//   authAPI
//     .logout()
//     .then((res) => {
//       if (res.data.resultCode === 0) {
//         dispatch(setIsLoggedIn({ isLoggedIn: false }))
//         dispatch(clearLogoutData({ todolists: [] }))
//         dispatch(setAppStatus({ status: 'succeeded' }))
//       } else {
//         handleServerAppError(dispatch, res.data)
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(dispatch, error)
//     })
// }

// type ActionsType = ReturnType<typeof setIsLoggedInAC>
type InitialStateType = {
  isLoggedIn: boolean
}

// type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>

export const authReducer = slice.reducer
