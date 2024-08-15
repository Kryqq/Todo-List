import { setAppStatus } from 'app/appSlice'
import { handleServerNetworkError } from './handleServerNetworkError'
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { AppDispatch, AppRootStateType } from 'app/store'
import { BaseResponse } from 'common/types/types'

type ThunkAPI = BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponse>


export const thunkTryCatch = async <T> ({ rejectWithValue}: ThunkAPI, fn: ()=> Promise<T>,): Promise<T | ReturnType <typeof rejectWithValue>> =>{
	try {
			return await fn()
	} catch (error) {
		handleServerNetworkError(dispatch, error)
		return rejectWithValue(error)
	} finally {
		// dispatch(setAppStatus({status: 'idle'}))
	}

}