import { useFormik } from 'formik'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { LoginParamsType } from '../api/authAPI.types'
import { BaseResponse } from 'common/types/types'
import { login } from '../model/authSlice'

export const useLogin = () => {
  const dispatch = useAppDispatch()
  const formik = useFormik({
    validate: (values) => {
      const errors: Partial<LoginParamsType> = {}
      if (!values.email) {
        errors.email = 'Email is required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Password is required'
      } else if (values.password.length < 3) {
        errors.password = 'Password must be more than 3 characters'
      }
      return errors
    },
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: (values, formikHelpers) => {
      dispatch(login(values))
        .unwrap()
        .catch((error: BaseResponse) => {
          error.fieldsErrors?.forEach((el) => formikHelpers.setFieldError(el.field, el.error))
        })
    },
  })
}
