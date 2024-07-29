import { Dispatch } from 'redux'
import { ResponseType } from '../api/todolists-api'
import { setAppError, setAppStatus } from 'app/appSlice'




export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
  if (data.messages.length) {
    dispatch(setAppError({ error: data.messages[0] }))
  } else {
    dispatch(setAppError({ error: 'Some error occurred' }))
  }
  dispatch(setAppStatus({ status: 'failed' }))
}
