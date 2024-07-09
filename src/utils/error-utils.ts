import { Dispatch } from "redux"
import { setErrorAC, setErrorType, setLoadingAC, setLoadingType } from "../app/app-reducer"
import { ResponseType } from "../api/todolists-api"


type ErrorUtilsDispatchType = Dispatch<setLoadingType | setErrorType>


export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, error: { message: string }) => {
	    dispatch(setErrorAC(error.message))
	    dispatch(setLoadingAC('failed'))
}

export const handleServerAppError = <T>(dispatch: ErrorUtilsDispatchType, data: ResponseType<T>)=>{
	if(data.messages.length) {
		dispatch(setErrorAC(data.messages[0]))
	  } else {
		  dispatch(setErrorAC('Some error occurred'))
	  }
	  dispatch(setLoadingAC('failed'))
}