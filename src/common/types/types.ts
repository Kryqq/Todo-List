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
