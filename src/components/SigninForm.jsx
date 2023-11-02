import { useFormik } from 'formik'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import * as Yup from 'yup'
import userApi from '@/apis/modules/user.api'
import { setAuthModalOpen } from '@/redux/features/authModelSlice'
import { setUser } from '@/redux/features/userSlice'
import { useNavigate } from 'react-router-dom'
import LoadingButton from './LoadingButton'
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
      username: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, 'user name minimum 8 character')
        .required('user name is required'),
      password: Yup.string()
        .min(8, 'password minimum 8 character')
        .required('password is required')
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
    }
  })
  return (
    <form onSubmit={signinForm.handleSubmit}>
      <h1 className="text-[22px] mb-6">Đăng Nhập</h1>

      <div className="mt-2 mb-5">
        <input
          type="text"
          name="username"
          placeholder="User name"
          id="username"
          className="block w-full border-2 border-gray-300 rounded-md px-5  py-4 text-2xl"
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
        <input
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          className="block w-full border-2 border-gray-300 rounded-md px-5 py-4 text-2xl"
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
          className={`uppercase px-6 py-4 text-[14px]  font-semibold bg-primary text-white  `}
        >
          đăng nhập
        </LoadingButton>

        <button
          type="button"
          className=" w-full uppercase rounded-md bg-white border-primary border-2 px-6 py-3 text-[14px] font-semibold text-primary shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => authUserPage('signup')}
        >
          đăng kí
        </button>
      </div>
    </form>
  )
}

export default SigninForm
