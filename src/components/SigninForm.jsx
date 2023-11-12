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

const SigninForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authPage = value => {
    navigate(`/auth/${value}`)
  }
  const [isLoginRequest, setIsLoginRequest] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const signinForm = useFormik({
    initialValues: {
      password: '',
      username: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, 'user name minimum 8 character')
        .required('user name is required'),
      password: Yup.string()
        .min(8, 'password minimum 8 character')
        .required('password is required'),
    }),
    onSubmit: async values => {
      setErrorMessage(undefined)
      setIsLoginRequest(true)
      const { response, error } = await userApi.signin(values)
      setIsLoginRequest(false)

      if (response) {
        dispatch(setUser(response))
        toast.success('Login success!')

        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
      if (error) setErrorMessage(error.message)
    },
  })
  return (
    <form onSubmit={signinForm.handleSubmit}>
      <h1 className="mb-6 text-[22px]">Đăng Nhập</h1>

      <div className="mb-5 mt-2">
        <Input
          type="text"
          name="username"
          placeholder="User name"
          id="username"
          value={signinForm.values.username}
          onChange={signinForm.handleChange}
        />
        {(signinForm.errors.username && (
          <p className="errMsg ">{signinForm.errors.username}</p>
        )) ||
          (errorMessage && errorMessage.includes('User') && (
            <p className="errMsg ">{errorMessage}</p>
          ))}
      </div>

      <div className="mt-2">
        <Input
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
        />
        {(signinForm.errors.password && (
          <p className="errMsg">{signinForm.errors.password}</p>
        )) ||
          (errorMessage && errorMessage.includes('password') && (
            <p className="errMsg ">{errorMessage}</p>
          ))}
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <Button className="uppercase" type="submit" disable={isLoginRequest}>
          <div className="mr-2">
            {isLoginRequest ? <Spinner size="lg" /> : ''}
          </div>
          đăng nhập
        </Button>

        <Button
          className="uppercase"
          variant="outline"
          onClick={() => authPage('signup')}
        >
          đăng kí
        </Button>
      </div>
    </form>
  )
}

export default SigninForm
