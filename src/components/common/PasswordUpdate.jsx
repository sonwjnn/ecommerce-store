import userApi from '../../apis/modules/user.api'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { setUser } from '../../redux/features/userSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const PasswordUpdate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const form = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, 'password minimum 8 character')
        .required('password is required'),
      newPassword: Yup.string()
        .min(8, 'new password minimum 8 character')
        .required('new password is required'),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'confirmNewPassword not match')
        .min(8, 'confirm new password minimum 8 character')
        .required('confirm new password is required')
    }),
    onSubmit: async values => onUpdate(values)
  })

  const onUpdate = async values => {
    // if (onRequest) return
    // setOnRequest(true)

    const { response, err } = await userApi.passwordUpdate(values)

    // setOnRequest(false)

    if (err) toast.error(err.message)
    if (response) {
      form.resetForm()
      navigate('/')
      dispatch(setUser(null))
      toast.success('Update password success! Please re-login')
    }
  }

  return (
    <div className="flex items-start justify-center">
      <div className="max-w-[600px] ml-[-100px] mt-[50px] px-4  ">
        <form onSubmit={form.handleSubmit} className="flex flex-col gap-6">
          <div className="flex gap-2  items-center">
            <label
              htmlFor="password"
              className="capitalize text-[16px] text-gray-500 w-[260px]"
            >
              mật khẩu
            </label>
            <input
              type="password"
              name="password"
              className=" block w-full border-2 border-gray-300 rounded-md px-5  py-2 text-2xl"
              id="password"
              value={form.values.password}
              onChange={form.handleChange}
            />
          </div>

          <div className="flex gap-2  items-center">
            <label
              htmlFor="newPassword"
              className="capitalize text-[16px] text-gray-500 w-[260px]"
            >
              mật khẩu mới
            </label>
            <input
              type="password"
              name="newPassword"
              className=" block w-full border-2 border-gray-300 rounded-md px-5  py-2 text-2xl"
              id="newPassword"
              value={form.values.newPassword}
              onChange={form.handleChange}
            />
          </div>

          <div className="flex gap-2 items-center">
            <label
              htmlFor="confirmNewPassword"
              className="capitalize w-[260px] text-gray-500 text-[16px]"
            >
              xác nhận mật khẩu
            </label>
            <input
              className=" block w-full border-2 border-gray-300 rounded-md px-5  py-2 text-2xl"
              type="password"
              name="confirmNewPassword"
              id="confirmNewPassword"
              value={form.values.confirmNewPassword}
              onChange={form.handleChange}
            />
          </div>

          <div className="mt-6 flex ">
            <div className="w-[266px]"></div>
            <button
              type="submit"
              className="mb-4 transition-all w-[25%] ml-auto uppercase rounded-md  bg-primary px-4 py-4 text-[14px] font-semibold text-white shadow-sm hover:brightness-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PasswordUpdate
