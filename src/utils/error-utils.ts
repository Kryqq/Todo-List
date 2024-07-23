import { Dispatch } from 'redux'

import { ResponseType } from '../api/todolists-api'
import { setAppErrorAC, setAppStatusAC } from 'app/app-reducer'

type ErrorUtilsDispatchType = Dispatch<ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>>

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, error: { message: string }) => {
  dispatch(setAppErrorAC(error.message))
  dispatch(setAppStatusAC('failed'))
}

export const handleServerAppError = <T>(dispatch: ErrorUtilsDispatchType, data: ResponseType<T>) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('Some error occurred'))
  }
  dispatch(setAppStatusAC('failed'))
}
