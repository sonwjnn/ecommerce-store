import userApi from '../../apis/modules/user.api'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { maskedEmail } from '../../utilities/constants'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch } from 'react-redux'

const ProfileUpdate = () => {
  const { user } = useSelector(state => state.user)
  const [onRequest, setOnRequest] = useState(false)
  const [originalEmail, setOriginalEmail] = useState('')
  const dispatch = useDispatch()
  const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/

  const initialValues = {
    username: user.username,
    displayName: user.name,
    email: user.email ? maskedEmail(user.email) : '',
    phone: user.phone ? user.phone : '',
    address: user.address ? user.address : '',
    city: user.city ? user.city : '',
    district: user.district ? user.district : '',
    sex: user.sex ? user.sex : '',
    birthday: user.birthday ? new Date(user.birthday) : null
  }

  const form = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, 'username minimum 8 character')
        .required('username is required'),
      displayName: Yup.string()
        .min(8, 'display name minimum 8 character')
        .required('display name is required'),
      email: Yup.string()
        .min(8, 'email minimum 8 character')
        .required('email is required')
        .email('invalid email'),
      phone: Yup.string()
        .min(10, 'phone minimum 10 character')
        .required('phone is required')
        .matches(phoneRegex, 'invalid phone number'),
      address: Yup.string()
        .min(10, 'address minimum 10 character')
        .required('address is required'),
      city: Yup.string()
        .min(10, 'city minimum 10 character')
        .required('city is required'),
      district: Yup.string()
        .min(4, 'district minimum 4 character')
        .required('district is required'),
      sex: Yup.string()
        .min(3, 'sex minimum 3 character')
        .required('sex is required'),
      birthday: Yup.string()
        .min(10, 'birthday minimum 10 character')
        .required('birthday is required')
    }),
    onSubmit: async values => onUpdate(values)
  })

  const onUpdate = async values => {
    if (onRequest) return
    setOnRequest(true)
    if (JSON.stringify(values) === JSON.stringify(initialValues)) return
    const { response, err } = await userApi.profileUpdate({
      ...values,
      email: originalEmail ? originalEmail : user.email
    })

    setOnRequest(false)

    if (err) toast.error(err.message)
    if (response) {
      setOriginalEmail(response.email)

      toast.success('Update profile success!')
    }
  }

  const handleEmailChange = e => {
    const email = e.target.value
    setOriginalEmail(email)
    form.setFieldValue('email', email)
  }

  return (
    <div className="flex items-start justify-center">
      <div className="max-w-[600px] md:ml-[-50px] mt-[50px] px-4  ">
        <form onSubmit={form.handleSubmit} className="flex flex-col gap-6">
          <div className="flex gap-2 flex-col md:flex-row  items-center">
            <label
              htmlFor="username"
              className="capitalize text-[16px]  text-gray-500 w-full md:w-[260px]"
            >
              tên đăng nhập
            </label>
            <div className="flex flex-col w-full">
              <input
                type="username"
                name="username"
                className=" block w-full border-2 border-gray-300 rounded-sm px-5  py-2 text-2xl"
                id="username"
                value={form.values.username}
                onChange={form.handleChange}
              />
              {form.errors.username && (
                <p className="errMsg ">{form.errors.username}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 flex-col md:flex-row  items-center">
            <label
              htmlFor="displayName"
              className="capitalize self-start text-[16px] text-gray-500 w-[260px]"
            >
              tên
            </label>
            <div className="flex flex-col w-full">
              <input
                type="text"
                name="displayName"
                className=" block w-full border-2 border-gray-300 rounded-sm px-5  py-2 text-2xl"
                id="displayName"
                value={form.values.displayName}
                onChange={form.handleChange}
              />
              {form.errors.displayName && (
                <p className="errMsg ">{form.errors.displayName}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 flex-col md:flex-row items-center">
            <label
              htmlFor="email"
              className="capitalize self-start w-[260px] text-gray-500 text-[16px]"
            >
              email
            </label>
            <div className="flex flex-col w-full">
              <input
                className=" block w-full border-2 border-gray-300 rounded-sm px-5  py-2 text-2xl"
                type="text"
                name="email"
                id="email"
                value={form.values.email}
                onChange={handleEmailChange}
              />
              {form.errors.email && (
                <p className="errMsg ">{form.errors.email}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 flex-col md:flex-row items-center">
            <label
              htmlFor="phone"
              className="capitalize self-start w-[260px] text-gray-500 text-[16px]"
            >
              số điện thoại
            </label>

            <div className="flex flex-col w-full">
              <input
                className=" block w-full border-2 border-gray-300 rounded-sm px-5  py-2 text-2xl"
                type="tel"
                name="phone"
                id="phone"
                value={form.values.phone}
                onChange={form.handleChange}
              />
              {form.errors.phone && (
                <p className="errMsg ">{form.errors.phone}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 flex-col md:flex-row items-center">
            <label
              htmlFor="address"
              className="capitalize self-start w-[260px] text-gray-500 text-[16px]"
            >
              địa chỉ
            </label>
            <div className="flex flex-col w-full">
              <input
                className=" block w-full border-2 border-gray-300 rounded-sm px-5  py-2 text-2xl"
                type="text"
                name="address"
                id="address"
                value={form.values.address}
                onChange={form.handleChange}
              />
              {form.errors.address && (
                <p className="errMsg ">{form.errors.address}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 flex-col md:flex-row items-center">
            <label
              htmlFor="city"
              className="capitalize self-start w-[260px] text-gray-500 text-[16px]"
            >
              thành phố
            </label>
            <div className="flex flex-col w-full">
              <input
                className=" block w-full border-2 border-gray-300 rounded-sm px-5  py-2 text-2xl"
                type="text"
                name="city"
                id="city"
                value={form.values.city}
                onChange={form.handleChange}
              />
              {form.errors.city && (
                <p className="errMsg ">{form.errors.city}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 flex-col md:flex-row items-center">
            <label
              htmlFor="text"
              className="capitalize self-start w-[260px] text-gray-500 text-[16px]"
            >
              Quận / Huyện
            </label>
            <div className="flex flex-col w-full">
              <input
                className=" block w-full border-2 border-gray-300 rounded-sm px-5  py-2 text-2xl"
                type="district"
                name="district"
                id="district"
                value={form.values.district}
                onChange={form.handleChange}
              />
              {form.errors.district && (
                <p className="errMsg ">{form.errors.district}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 flex-col md:flex-row items-center">
            <label
              htmlFor="sex"
              className="capitalize self-start w-[160px] text-gray-500 text-[16px]"
            >
              giới tính
            </label>
            <div className="flex justify-start self-start gap-8">
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
                  checked={form.values.sex === 'male'}
                  id="sex"
                  value={'male'}
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
                  checked={form.values.sex === 'female'}
                  id="sex"
                  value={'female'}
                  onChange={form.handleChange}
                />
              </div>
              {form.errors.sex && <p className="errMsg ">{form.errors.sex}</p>}
            </div>
          </div>

          <div className="flex gap-2 flex-col md:flex-row items-center">
            <label
              htmlFor="district"
              className="capitalize self-start w-[260px] text-gray-500 text-[16px]"
            >
              ngày sinh
            </label>
            <div className="flex  flex-col w-full">
              <DatePicker
                id="birthday"
                name="birthday"
                className=" block w-full border-2 border-gray-300 rounded-sm px-5  py-2 text-2xl"
                selected={form.values.birthday}
                onChange={date => form.setFieldValue('birthday', date)}
                showYearDropdown
                dateFormat="dd/MM/yyyy"
              />
              {form.errors.birthday && (
                <p className="errMsg ">{form.errors.birthday}</p>
              )}
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
