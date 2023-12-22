import userApi from '@/apis/modules/user.api'
import { setUser } from '@/redux/features/userSlice'
import { useFormik } from 'formik'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { Button } from './ui/button'
import { Input } from './ui/input'

const PasswordUpdate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [onRequest, setOnRequest] = useState(false)

  const form = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
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
        .required('confirm new password is required'),
    }),
    onSubmit: async values => onUpdate(values),
  })

  const onUpdate = async values => {
    if (onRequest) return
    setOnRequest(true)

    const { response, err } = await userApi.passwordUpdate(values)

    setOnRequest(false)

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
      <div className="mt-[50px] max-w-[600px] px-4 md:ml-[-50px]  ">
        <form onSubmit={form.handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2  md:flex-row">
            <label
              htmlFor="password"
              className="w-[260px] self-start text-base capitalize text-gray-500"
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

          <div className="flex flex-col items-center gap-2  md:flex-row">
            <label
              htmlFor="newPassword"
              className="w-[260px] self-start text-base capitalize text-gray-500"
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

          <div className="flex flex-col items-center gap-2 md:flex-row">
            <label
              htmlFor="confirmNewPassword"
              className="w-[260px] self-start text-base capitalize text-gray-500"
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
            <Button type="submit" disable={onRequest} className="ml-auto px-6 ">
              Lưu
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PasswordUpdate
