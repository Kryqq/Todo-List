import { createSlice, PayloadAction } from '@reduxjs/toolkit'
 

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppInitialState = ReturnType<typeof slice.getInitialState>

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const appReducer = slice.reducer
export const { setAppError, setAppStatus, setIsInitialized } = slice.actions

// export const initializeAppTC = (): AppThunk => (dispatch: Dispatch) => {
//   authAPI.me().then((res) => {
//     if (res.data.resultCode === 0) {
//       dispatch(setIsLoggedIn({ isLoggedIn: true }))
//     } else {
//     }

//     dispatch(setIsInitialized({ isInitialized: true }))
//   })
// }

// export const _appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//   switch (action.type) {
//     case 'APP/SET-STATUS':
//       return { ...state, status: action.status }
//     case 'APP/SET-ERROR':
//       return { ...state, error: action.error }
//     case 'APP/SET-IS-INITIALIED':
//       return { ...state, isInitialized: action.value }
//     default:
//       return { ...state }
//   }
// }

// export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error }) as const
// export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status }) as const
// export const setAppInitializedAC = (value: boolean) => ({ type: 'APP/SET-IS-INITIALIED', value }) as const

// export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
// export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

// type ActionsType = SetAppErrorActionType | SetAppStatusActionType | ReturnType<typeof setAppInitializedAC>
