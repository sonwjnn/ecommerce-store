import userApi from '../../apis/modules/user.api'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { setUser } from '../../redux/features/userSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const ProfileUpdate = () => {
  const { user } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [maskedEmail, setMaskedEmail] = useState('')

  useEffect(() => {
    console.log(user)
  }, [])

  const form = useFormik({
    initialValues: {
      username: user.username,
      displayName: user.name,
      email: user.email ? user.email : '',
      phone: user.phone ? user.phone : '',
      sex: user.sex ? user.sex : '',
      birthday: user.birthday ? user.birthday : ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, 'username minimum 8 character')
        .required('username is required'),
      displayName: Yup.string()
        .min(8, 'display name minimum 8 character')
        .required('display name is required'),
      email: Yup.string()
        .min(8, 'email minimum 8 character')
        .required('email is required'),
      phone: Yup.string()
        .min(10, 'phone minimum 10 character')
        .required('phone is required'),
      address: Yup.string()
        .min(10, 'address minimum 10 character')
        .required('address is required'),
      city: Yup.string()
        .min(10, 'city minimum 10 character')
        .required('city is required'),
      district: Yup.string()
        .min(10, 'district minimum 10 character')
        .required('district is required'),
      sex: Yup.string()
        .min(3, 'sex minimum 3 character')
        .required('sex is required'),
      birthday: Yup.string()
        .min(8, 'birthday minimum 8 character')
        .required('birthday is required')
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
              htmlFor="username"
              className="capitalize text-[16px] text-gray-500 w-[260px]"
            >
              tên đăng nhập
            </label>
            <input
              type="username"
              name="username"
              className=" block w-full border-2 border-gray-300 rounded-sm px-5  py-2 text-2xl"
              id="username"
              value={form.values.username}
              onChange={form.handleChange}
            />
          </div>

          <div className="flex gap-2  items-center">
            <label
              htmlFor="displayName"
              className="capitalize text-[16px] text-gray-500 w-[260px]"
            >
              tên
            </label>
            <input
              type="displayName"
              name="displayName"
              className=" block w-full border-2 border-gray-300 rounded-sm px-5  py-2 text-2xl"
              id="displayName"
              value={form.values.displayName}
              onChange={form.handleChange}
            />
          </div>

          <div className="flex gap-2 items-center">
            <label
              htmlFor="email"
              className="capitalize w-[260px] text-gray-500 text-[16px]"
            >
              email
            </label>
            <input
              className=" block w-full border-2 border-gray-300 rounded-sm px-5  py-2 text-2xl"
              type="email"
              name="email"
              id="email"
              value={form.values.email}
              onChange={form.handleChange}
            />
          </div>

          <div className="flex gap-2 items-center">
            <label
              htmlFor="phone"
              className="capitalize w-[260px] text-gray-500 text-[16px]"
            >
              số điện thoại
            </label>
            <input
              className=" block w-full border-2 border-gray-300 rounded-sm px-5  py-2 text-2xl"
              type="phone"
              name="phone"
              id="phone"
              value={form.values.phone}
              onChange={form.handleChange}
            />
          </div>

          <div className="flex gap-2 items-center">
            <label
              htmlFor="address"
              className="capitalize w-[260px] text-gray-500 text-[16px]"
            >
              địa chỉ
            </label>
            <input
              className=" block w-full border-2 border-gray-300 rounded-sm px-5  py-2 text-2xl"
              type="address"
              name="address"
              id="address"
              value={form.values.address}
              onChange={form.handleChange}
            />
          </div>

          <div className="flex gap-2 items-center">
            <label
              htmlFor="city"
              className="capitalize w-[260px] text-gray-500 text-[16px]"
            >
              thành phố
            </label>
            <input
              className=" block w-full border-2 border-gray-300 rounded-sm px-5  py-2 text-2xl"
              type="city"
              name="city"
              id="city"
              value={form.values.city}
              onChange={form.handleChange}
            />
          </div>

          <div className="flex gap-2 items-center">
            <label
              htmlFor="district"
              className="capitalize w-[260px] text-gray-500 text-[16px]"
            >
              Quận / Huyện
            </label>
            <input
              className=" block w-full border-2 border-gray-300 rounded-sm px-5  py-2 text-2xl"
              type="district"
              name="district"
              id="district"
              value={form.values.district}
              onChange={form.handleChange}
            />
          </div>

          <div className="flex gap-2 items-center">
            <label
              htmlFor="sex"
              className="capitalize w-[160px] text-gray-500 text-[16px]"
            >
              giới tính
            </label>
            <div className="flex justify-start gap-8">
              <div className="flex gap-2">
                <label
                  htmlFor="male"
                  className="capitalize text-gray-500 text-[16px]"
                >
                  nam
                </label>
                <input
                  className=" block  border-2 border-gray-300 rounded-sm px-5  py-4 text-2xl"
                  type="radio"
                  name="sex"
                  id="sex"
                  value={form.values.sex}
                  onChange={form.handleChange}
                />
              </div>
              <div className="flex gap-2">
                <label
                  htmlFor="female"
                  className="capitalize text-gray-500 text-[16px]"
                >
                  nữ
                </label>
                <input
                  className=" block w-full border-2 border-gray-300 rounded-sm px-5  py-4 text-2xl"
                  type="radio"
                  name="sex"
                  id="sex"
                  value={form.values.sex}
                  onChange={form.handleChange}
                />
              </div>
            </div>
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

export default ProfileUpdate
