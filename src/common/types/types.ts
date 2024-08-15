export type TestAction<T extends (...args: any) => any> = Omit<ReturnType<T>, 'meta'>

type FiledErrorType = {
  error: string
  field: string
}

export type BaseResponse<D = {}> = {
  resultCode: number
  messages: Array<string>
  data: D
  fieldsErrors: FiledErrorType[]
}
export type RejectAppError = {
  error: BaseResponse
  type: 'appError'
}
export type RejectCatchError = {
  error: unknown
  type: 'catchError'
}

export type RejectActionError = RejectAppError | RejectCatchError
