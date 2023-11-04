import userApi from '@/apis/modules/user.api'
import { setAuthModalOpen } from '@/redux/features/authModelSlice'
import { setUser } from '@/redux/features/userSlice'
import { useFormik } from 'formik'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import LoadingButton from './LoadingButton'
import { Input } from './ui/input'

const SigninForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authUserPage = value => {
    navigate(`/authUser/${value}`)
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
        <LoadingButton
          type="submit"
          loading={isLoginRequest}
          colorLoading={'#fb5533'}
          variant={'contained'}
          className={`bg-primary px-6 py-3 text-sm  font-semibold uppercase text-white  `}
        >
          đăng nhập
        </LoadingButton>

        <button
          type="button"
          className=" w-full rounded-md border-2 border-primary bg-white px-6 py-2 text-sm font-semibold uppercase text-primary shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => authUserPage('signup')}
        >
          đăng kí
        </button>
      </div>
    </form>
  )
}

export default SigninForm
