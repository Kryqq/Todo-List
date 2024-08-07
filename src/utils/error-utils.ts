import { Dispatch } from 'redux'
import { setAppError, setAppStatus } from 'app/appSlice'
import { BaseResponse } from 'common/types/types'

/**
 * Handles server app error
 * @param dispatch
 * @param data
 * @param isShowGlobalError
 * @returns void
 */
export const handleServerAppError = <T>(
  dispatch: Dispatch,
  data: BaseResponse<T>,
  isShowGlobalError: boolean = true,
): void => {
  if (isShowGlobalError) {
    dispatch(setAppError({ error: data.messages.length ? data.messages[0] : 'Some error occurred' }))
  }

  dispatch(setAppStatus({ status: 'failed' }))
}
