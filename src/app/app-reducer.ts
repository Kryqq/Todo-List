

export type RequestStatusType = 
'idle' 
|
'loading' 
| 
'succeeded' 
| 
'failed'


const initialState = {
  isInitialized: false,
  status: 'loading' as RequestStatusType,
  error: null as null | string
}
 

type InitialStateType = typeof initialState


export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { 
		...state,
		status: action.status 
		}		
    case 'APP/SET-ERROR':
      return { 
		...state,
		error: action.error 
		}
		case 'login/SET-IS-INITIALIZED': {
			return { ...state, isInitialized: action.isInitialized }
		   }		
    default:
      return state
  }
}


export type setLoadingType = ReturnType<typeof setLoadingAC>
export type setErrorType = ReturnType<typeof setErrorAC>
export type setIsInitializedType = ReturnType<typeof setIsInitializedAC>
export const setLoadingAC = (status: RequestStatusType) =>({ type: 'APP/SET-STATUS', status } as const)
export const setErrorAC = (error: string | null) =>({ type: 'APP/SET-ERROR', error } as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({ type: 'login/SET-IS-INITIALIZED', isInitialized }) as const
type ActionsType = setLoadingType | setErrorType | setIsInitializedType

 



