import { useFormik } from 'formik'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
// import userApi from '../../api/modules/user.api'
import { setAuthModalOpen } from '../../redux/features/authModelSlice'
import { setUser } from '../../redux/features/userSlice'

const SigninForm = ({ switchAuthState }) => {
  const dispatch = useDispatch()
  const [isLoginRequest, setIsLoginRequest] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const signinForm = useFormik({
    initialValues: {
      password: '',
      username: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, 'username minimum 8 character')
        .required('username is required'),
      password: Yup.string()
        .min(8, 'password minimum 8 character')
        .required('password is required')
    }),
    onSubmit: async values => {
      setErrorMessage(undefined)
      setIsLoginRequest(true)
      const { response, err } = await userApi.signin(values)
      setIsLoginRequest(false)

      if (response) {
        signinForm.resetForm()
        dispatch(setUser(response))
        dispatch(setAuthModalOpen(false))
        toast.success('Sign in success')
      }

      if (err) setErrorMessage(err.message)
    }
  })
  return (
    <form onSubmit={signinForm.handleSubmit}>
      <h1 className="text-[22px] mb-6">Đăng Nhập</h1>

      <label
        htmlFor="first-name"
        className="block   text-[16px] leading-6 text-gray-900"
      >
        Tên đăng nhập
      </label>
      <div className="mt-2 mb-6">
        <input
          type="text"
          name="first-name"
          id="first-name"
          autoComplete="given-name"
          className="block w-full border-2 border-gray-300 rounded-md px-5  py-4 text-2xl"
        />
      </div>

      <label
        htmlFor="first-name"
        className="block   text-[16px] leading-6 text-gray-900 "
      >
        Mật khẩu
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="first-name"
          id="first-name"
          autoComplete="given-name"
          className="block w-full border-2 border-gray-300 rounded-md px-5 py-4 text-2xl"
        />
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <button
          type="submit"
          className=" w-full uppercase rounded-md bg-primary px-6 py-4 text-[14px] font-semibold text-white shadow-sm hover:brightness-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          đăng nhập
        </button>

        <button
          type="button"
          className=" w-full uppercase rounded-md bg-white border-primary border-2 px-6 py-3 text-[14px] font-semibold text-primary shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => switchAuthState('signup')}
        >
          đăng kí
        </button>
      </div>
    </form>
  )
}

export default SigninForm
