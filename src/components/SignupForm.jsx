import userApi from '@/apis/modules/user.api'
import { setUser } from '@/redux/features/userSlice'
import { useFormik } from 'formik'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { Spinner } from './spinner'
import { Button } from './ui/button'
import { Input } from './ui/input'

const SignupForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoginRequest, setIsLoginRequest] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const history = useNavigate()
  const authPage = value => {
    history(`/auth/${value}`)
  }
  const signupForm = useFormik({
    initialValues: {
      displayName: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      displayName: Yup.string()
        .min(8, 'display name minimum 8 character')
        .required('display name is required'),
      username: Yup.string()
        .min(8, 'user name minimum 8 character')
        .required('user name is required'),
      password: Yup.string()
        .min(8, 'password minimum 8 character')
        .required('password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'confirm new password not match')
        .min(8, 'confirm password minimum 8 character')
        .required('confirm password is required'),
    }),
    onSubmit: async values => {
      setErrorMessage(undefined)
      setIsLoginRequest(true)
      const { response, error } = await userApi.signup(values)
      setIsLoginRequest(false)

      if (response) {
        signupForm.resetForm()
        dispatch(setUser(response))

        setTimeout(() => {
          navigate('/')
        }, 2000)
        toast.success('Sign up success')
      }

      if (error) setErrorMessage(error.message)
    },
  })
  return (
    <form onSubmit={signupForm.handleSubmit}>
      <h1 className="mb-6 text-[22px]">Đăng Kí</h1>

      <div className="mb-5 mt-2">
        <Input
          type="text"
          name="displayName"
          placeholder="Display name"
          id="displayName"
          value={signupForm.values.displayName}
          onChange={signupForm.handleChange}
        />
        {!isLoginRequest && signupForm.errors.displayName && (
          <p className="errMsg ">{signupForm.errors.displayName}</p>
        )}
      </div>

      <div className="mb-5 mt-2">
        <Input
          type="text"
          name="username"
          placeholder="User name"
          id="username"
          autoComplete="given-name"
          value={signupForm.values.username}
          onChange={signupForm.handleChange}
        />
        {!isLoginRequest &&
          ((signupForm.errors.username && (
            <p className="errMsg ">{signupForm.errors.username}</p>
          )) ||
            (errorMessage && <p className="errMsg ">{errorMessage}</p>))}
      </div>

      <div className="mb-5 mt-2">
        <Input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          value={signupForm.values.password}
          onChange={signupForm.handleChange}
        />
        {!isLoginRequest && signupForm.errors.password && (
          <p className="errMsg ">{signupForm.errors.password}</p>
        )}
      </div>

      <div className="mt-2">
        <Input
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          id="confirmPassword"
          value={signupForm.values.confirmPassword}
          onChange={signupForm.handleChange}
        />
        {!isLoginRequest && signupForm.errors.confirmPassword && (
          <p className="errMsg ">{signupForm.errors.confirmPassword}</p>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <Button className="uppercase" type="submit" disable={isLoginRequest}>
          <div className="mr-2">
            {isLoginRequest ? <Spinner size="lg" /> : ''}
          </div>
          đăng ký
        </Button>

        <Button
          className="uppercase"
          variant="outline"
          onClick={() => authPage('signin')}
        >
          đăng nhập
        </Button>
      </div>
    </form>
  )
}

export default SignupForm
