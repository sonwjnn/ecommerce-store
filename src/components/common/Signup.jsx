import { useFormik } from 'formik'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { setUser } from '../../redux/features/userSlice'
import { useNavigate } from 'react-router-dom'
import userApi from '../../apis/modules/user.api'

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
        .min(8, 'displayName minimum 8 character')
        .required('displayName is required'),
      username: Yup.string()
        .min(8, 'username minimum 8 character')
        .required('username is required'),
      password: Yup.string()
        .min(8, 'password minimum 8 character')
        .required('password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'confirmNewPassword not match')
        .min(8, 'confirmPassword minimum 8 character')
        .required('confirmPassword is required')
    }),
    onSubmit: async values => {
      console.log(123)
      setErrorMessage(undefined)
      setIsLoginRequest(true)
      const { response, err } = await userApi.signup(values)
      setIsLoginRequest(false)

      if (response) {
        signupForm.resetForm()
        dispatch(setUser(response))

        setTimeout(() => {
          navigate('/')
        }, 2000)
        toast.success('Sign up success')
      }

      if (err) setErrorMessage(err.message)
    }
  })
  return (
    <form onSubmit={signupForm.handleSubmit}>
      <h1 className="text-[22px] mb-6">Đăng Kí</h1>

      <label
        htmlFor="display-name"
        className="block   text-[16px] leading-6 text-gray-900"
      >
        Tên user
      </label>
      <div className="mt-2 mb-5">
        <input
          type="text"
          name="displayName"
          placeholder="display name"
          id="displayName"
          className="block w-full border-2 border-gray-300 rounded-md px-5  py-4 text-2xl"
          value={signupForm.values.displayName}
          onChange={signupForm.handleChange}
        />
      </div>

      <label
        htmlFor="first-name"
        className="block   text-[16px] leading-6 text-gray-900"
      >
        Tên đăng nhập
      </label>
      <div className="mt-2 mb-5">
        <input
          type="text"
          name="username"
          placeholder="user name"
          id="username"
          autoComplete="given-name"
          className="block w-full border-2 border-gray-300 rounded-md px-5  py-4 text-2xl"
          value={signupForm.values.username}
          onChange={signupForm.handleChange}
        />
      </div>

      <label
        htmlFor="first-name"
        className="block   text-[16px] leading-6 text-gray-900 "
      >
        Mật khẩu
      </label>
      <div className="mt-2 mb-5">
        <input
          type="password"
          placeholder="password"
          name="password"
          id="password"
          className="block w-full border-2 border-gray-300 rounded-md px-5 py-4 text-2xl"
          value={signupForm.values.password}
          onChange={signupForm.handleChange}
        />
      </div>

      <label
        htmlFor="first-name"
        className="block   text-[16px] leading-6 text-gray-900 "
      >
        Nhập lại mật khẩu
      </label>
      <div className="mt-2">
        <input
          type="password"
          placeholder="confirm password"
          name="confirmPassword"
          id="confirmPassword"
          className="block w-full border-2 border-gray-300 rounded-md px-5 py-4 text-2xl"
          value={signupForm.values.confirmPassword}
          onChange={signupForm.handleChange}
        />
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <button
          type="submit"
          className="transition-all w-full uppercase rounded-md bg-primary px-6 py-4 text-[14px] font-semibold text-white shadow-sm hover:brightness-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          đăng kí
        </button>

        <button
          type="button"
          className=" w-full uppercase rounded-md bg-white border-primary border-2 px-6 py-3 text-[14px] font-semibold text-primary shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => authUserPage('signin')}
        >
          đăng nhập
        </button>
      </div>
    </form>
  )
}

export default SignupForm
