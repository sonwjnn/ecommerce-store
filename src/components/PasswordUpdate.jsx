import userApi from '@/apis/modules/user.api'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { setUser } from '@/redux/features/userSlice'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Input } from './ui/input'

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
      <div className="max-w-[600px] md:ml-[-50px] mt-[50px] px-4  ">
        <form onSubmit={form.handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-2  items-center">
            <label
              htmlFor="password"
              className="capitalize text-[16px] self-start text-gray-500 w-[260px]"
            >
              mật khẩu
            </label>
            <Input
              type="password"
              name="password"
              id="password"
              value={form.values.password}
              onChange={form.handleChange}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2  items-center">
            <label
              htmlFor="newPassword"
              className="capitalize self-start text-[16px] text-gray-500 w-[260px]"
            >
              mật khẩu mới
            </label>
            <Input
              type="password"
              name="newPassword"
              id="newPassword"
              value={form.values.newPassword}
              onChange={form.handleChange}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2 items-center">
            <label
              htmlFor="confirmNewPassword"
              className="capitalize w-[260px] self-start text-gray-500 text-[16px]"
            >
              xác nhận mật khẩu
            </label>
            <Input
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
              className="mb-4 transition-all w-[25%] ml-auto uppercase rounded-md  bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm hover:brightness-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
