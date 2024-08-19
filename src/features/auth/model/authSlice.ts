import { handleServerAppError } from 'utils/error-utils'
import { createSlice, isAnyOf, isFulfilled, PayloadAction } from '@reduxjs/toolkit'
import { setAppStatus, setIsInitialized } from 'app/appSlice'
import { clearLogoutData } from 'features/TodolistsList/model/todolistsSlice'

import { LoginParamsType } from '../api/authAPI.types'
import { authAPI } from '../api/authAPI'
import { createAppAsyncThunk } from 'utils/createAsyncThunk'
import { thunkTryCatch } from 'utils/thunkTryCatch'
import { ResultCode } from 'common/types/enums/enums'
import { RejectAppError, RejectCatchError } from 'common/types/types'

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
    builder.addMatcher(
      //  (action) => {
      //  isFulfilled(login, logout, initializeApp),
      isAnyOf(login.fulfilled, logout.fulfilled, initializeApp.fulfilled),
      //    if (
      //      action.type === login.fulfilled.type ||
      //      action.type === logout.fulfilled.type ||
      //      action.type === initializeApp.fulfilled.type
      //    ) {
      //      return true
      //    } else {
      //      return false
      //    }
      //  },
      (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
        state.isLoggedIn = action.payload.isLoggedIn
      },
    )
  },
})

export const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${slice.name}/initializeApp`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.me()
      if (res.data.resultCode === ResultCode.Success) {
        return { isLoggedIn: true }
      } else {
        handleServerAppError(dispatch, res.data)
        return rejectWithValue({ error: res.data, type: 'appError' } as RejectAppError)
      }
    }).finally(() => {
      dispatch(setIsInitialized({ isInitialized: true }))
    })
  },
)
// finally {
// 	dispatch(setIsInitialized({ isInitialized: true }))
//    }
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
        const isShowAppError = !res.data.fieldsErrors.length
        handleServerAppError(dispatch, res.data, isShowAppError)
        dispatch(setAppStatus({ status: 'failed' }))
        return rejectWithValue({ error: res.data, type: 'appError' } as RejectAppError)
      }
    } catch (error) {
      //  handleServerNetworkError(dispatch, error)
      return rejectWithValue({ error, type: 'catchError' } as RejectCatchError)
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
        return rejectWithValue({ error: res.data, type: 'appError' } as RejectAppError)
      }
    } catch (error) {
      //  handleServerNetworkError(dispatch, error)
      return rejectWithValue({ error, type: 'catchError' } as RejectCatchError)
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
