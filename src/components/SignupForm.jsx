import { useFormik } from 'formik'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import * as Yup from 'yup'
import { setUser } from '@/redux/features/userSlice'
import { useNavigate } from 'react-router-dom'
import userApi from '@/apis/modules/user.api'
import LoadingButton from './LoadingButton'
import { Input } from './ui/input'

const SignupForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoginRequest, setIsLoginRequest] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const history = useNavigate()
  const authUserPage = value => {
    history(`/authUser/${value}`)
  }
  const signupForm = useFormik({
    initialValues: {
      displayName: '',
      username: '',
      password: '',
      confirmPassword: ''
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
        .required('confirm password is required')
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
    }
  })
  return (
    <form onSubmit={signupForm.handleSubmit}>
      <h1 className="text-[22px] mb-6">Đăng Kí</h1>

      <div className="mt-2 mb-5">
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

      <div className="mt-2 mb-5">
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

      <div className="mt-2 mb-5">
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
        <LoadingButton
          type="submit"
          loading={isLoginRequest}
          colorLoading={'#fb5533'}
          variant={'contained'}
          className={`uppercase px-6 py-3 text-sm  font-semibold bg-primary text-white  `}
        >
          đăng ký
        </LoadingButton>

        <button
          type="button"
          className=" w-full uppercase rounded-md bg-white border-primary border-2 px-6 py-2 text-sm font-semibold text-primary shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => authUserPage('signin')}
        >
          đăng nhập
        </button>
      </div>
    </form>
  )
}

export default SignupForm
