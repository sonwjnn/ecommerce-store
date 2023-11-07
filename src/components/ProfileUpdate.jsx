import userApi from '@/apis/modules/user.api'
import { updateUser } from '@/redux/features/userSlice'
import { maskedEmail } from '@/utilities/constants'
import { districts, provinces } from '@/utilities/provinceCity'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

import LoadingButton from './LoadingButton'
import { Input } from './ui/input'

const ProfileUpdate = () => {
  const { user } = useSelector(state => state.user)
  const [onRequest, setOnRequest] = useState(false)
  const [originalEmail, setOriginalEmail] = useState('')
  const [selectedProvince, setSelectedProvince] = useState('')
  const [provinceOptions, setProvinceOptions] = useState(provinces)
  const [districtOptions, setDistrictOptions] = useState(districts)

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
    birthday: user.birthday ? new Date(user.birthday) : null,
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
      sex: Yup.string()
        .min(3, 'sex minimum 3 character')
        .required('sex is required'),
      birthday: Yup.string()
        .min(10, 'birthday minimum 10 character')
        .required('birthday is required'),
    }),
    onSubmit: async values => onUpdate(values),
  })

  const onUpdate = async values => {
    if (onRequest) return
    setOnRequest(true)
    if (JSON.stringify(values) === JSON.stringify(initialValues)) return

    const { response, err } = await userApi.profileUpdate({
      ...values,
      email: originalEmail ? originalEmail : user.email,
    })

    setOnRequest(false)

    if (err) toast.error(err.message)
    if (response) {
      setOriginalEmail(response.email)

      dispatch(
        updateUser({
          ...values,
          birthday: dayjs(values.birthday).format('YYYY-MM-DD'),
        })
      )
      toast.success('Update profile success!')
    }
  }

  const handleEmailChange = e => {
    const email = e.target.value
    setOriginalEmail(email)
    form.setFieldValue('email', email)
  }

  useEffect(() => {
    if (form.values.city) {
      const provinceIndex = provinces.indexOf(form.values.city)
      const newDistricts = districts[provinceIndex]
      setDistrictOptions(newDistricts)
      setSelectedProvince(form.values.city)
    }
  }, [form.values.city])

  return (
    <div className="flex items-start justify-center">
      <div className="mt-[50px] max-w-[600px] px-4 md:ml-[-50px]  ">
        <form onSubmit={form.handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2  md:flex-row">
            <label
              htmlFor="username"
              className="w-full text-base  capitalize text-gray-500 md:w-[260px]"
            >
              tên đăng nhập
            </label>
            <div className="flex w-full flex-col">
              <Input
                type="username"
                name="username"
                id="username"
                value={form.values.username}
                onChange={form.handleChange}
              />
              {form.errors.username && (
                <p className="errMsg ">{form.errors.username}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2  md:flex-row">
            <label
              htmlFor="displayName"
              className="w-[260px] self-start text-base capitalize text-gray-500"
            >
              tên
            </label>
            <div className="flex w-full flex-col">
              <Input
                type="text"
                name="displayName"
                id="displayName"
                value={form.values.displayName}
                onChange={form.handleChange}
              />
              {form.errors.displayName && (
                <p className="errMsg ">{form.errors.displayName}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 md:flex-row">
            <label
              htmlFor="email"
              className="w-[260px] self-start text-base capitalize text-gray-500"
            >
              email
            </label>
            <div className="flex w-full flex-col">
              <Input
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

          <div className="flex flex-col items-center gap-2 md:flex-row">
            <label
              htmlFor="phone"
              className="w-[260px] self-start text-base capitalize text-gray-500"
            >
              số điện thoại
            </label>

            <div className="flex w-full flex-col">
              <Input
                type="text"
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

          <div className="flex flex-col items-center gap-2 md:flex-row">
            <label
              htmlFor="address"
              className="w-[260px] self-start text-base capitalize text-gray-500"
            >
              địa chỉ
            </label>
            <div className="flex w-full flex-col">
              <Input
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

          <div className="flex flex-col items-center gap-2 md:flex-row">
            <label
              htmlFor="city"
              className="w-[260px] self-start text-base capitalize text-gray-500"
            >
              thành phố
            </label>

            <select
              className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring  disabled:cursor-not-allowed disabled:opacity-50"
              name="city"
              id="city"
              value={form.values.city}
              onChange={form.handleChange}
            >
              <option value={form.values.city || ''}>
                {form.values.city || 'Provinces/City'}
              </option>
              {provinceOptions?.map((province, index) => (
                <option key={index} value={province}>
                  {province}
                </option>
              ))}
            </select>
            {form.errors.city && <p className="errMsg ">{form.errors.city}</p>}
          </div>

          <div className="flex flex-col items-center gap-2 md:flex-row">
            <label
              htmlFor="text"
              className="w-[260px] self-start text-base capitalize text-gray-500"
            >
              Quận / Huyện
            </label>

            <select
              className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring  disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!selectedProvince}
              value={form.values.district || 'District'}
              name="district"
              id="district"
              onChange={form.handleChange}
            >
              {districtOptions?.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
            {form.errors.district && (
              <p className="errMsg ">{form.errors.district}</p>
            )}
          </div>

          <div className="flex flex-col items-center gap-2 md:flex-row">
            <label
              htmlFor="sex"
              className="w-[160px] self-start text-base capitalize text-gray-500"
            >
              giới tính
            </label>
            <div className="flex justify-start gap-8 self-start">
              <div className="flex gap-2">
                <label
                  htmlFor="male"
                  className="text-base capitalize text-gray-500"
                >
                  nam
                </label>
                <Input
                  className="text-base"
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
                  className="text-base capitalize text-gray-500"
                >
                  nữ
                </label>
                <Input
                  className="text-base"
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

          <div className="flex flex-col items-center gap-2 md:flex-row">
            <label
              htmlFor="district"
              className="w-[260px] self-start text-base capitalize text-gray-500"
            >
              ngày sinh
            </label>
            <div className="flex  w-full flex-col">
              <DatePicker
                id="birthday"
                name="birthday"
                className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring  disabled:cursor-not-allowed disabled:opacity-50"
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

            <LoadingButton
              type="submit"
              loading={onRequest}
              colorLoading={'#fb5533'}
              variant={'contained'}
              className={`mb-4  ml-auto w-[25%] bg-primary  px-4 py-4 text-sm font-semibold uppercase text-white  `}
            >
              lưu
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileUpdate
