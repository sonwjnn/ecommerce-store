import userApi from '@/apis/modules/user.api'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { maskedEmail } from '@/utilities/constants'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import LoadingButton from './LoadingButton'
import { Input } from './ui/input'
import { provinces, districts } from '@/utilities/provinceCity'
import { updateUser } from '@/redux/features/userSlice'
import dayjs from 'dayjs'

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

      dispatch(
        updateUser({
          ...values,
          birthday: dayjs(values.birthday).format('YYYY-MM-DD')
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
      <div className="max-w-[600px] md:ml-[-50px] mt-[50px] px-4  ">
        <form onSubmit={form.handleSubmit} className="flex flex-col gap-6">
          <div className="flex gap-2 flex-col md:flex-row  items-center">
            <label
              htmlFor="username"
              className="capitalize text-base  text-gray-500 w-full md:w-[260px]"
            >
              tên đăng nhập
            </label>
            <div className="flex flex-col w-full">
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

          <div className="flex gap-2 flex-col md:flex-row  items-center">
            <label
              htmlFor="displayName"
              className="capitalize self-start text-base text-gray-500 w-[260px]"
            >
              tên
            </label>
            <div className="flex flex-col w-full">
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

          <div className="flex gap-2 flex-col md:flex-row items-center">
            <label
              htmlFor="email"
              className="capitalize self-start w-[260px] text-gray-500 text-base"
            >
              email
            </label>
            <div className="flex flex-col w-full">
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

          <div className="flex gap-2 flex-col md:flex-row items-center">
            <label
              htmlFor="phone"
              className="capitalize self-start w-[260px] text-gray-500 text-base"
            >
              số điện thoại
            </label>

            <div className="flex flex-col w-full">
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

          <div className="flex gap-2 flex-col md:flex-row items-center">
            <label
              htmlFor="address"
              className="capitalize self-start w-[260px] text-gray-500 text-base"
            >
              địa chỉ
            </label>
            <div className="flex flex-col w-full">
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

          <div className="flex gap-2 flex-col md:flex-row items-center">
            <label
              htmlFor="city"
              className="capitalize self-start w-[260px] text-gray-500 text-base"
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

          <div className="flex gap-2 flex-col md:flex-row items-center">
            <label
              htmlFor="text"
              className="capitalize self-start w-[260px] text-gray-500 text-base"
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

          <div className="flex gap-2 flex-col md:flex-row items-center">
            <label
              htmlFor="sex"
              className="capitalize self-start w-[160px] text-gray-500 text-base"
            >
              giới tính
            </label>
            <div className="flex justify-start self-start gap-8">
              <div className="flex gap-2">
                <label
                  htmlFor="male"
                  className="capitalize text-gray-500 text-base"
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
                  className="capitalize text-gray-500 text-base"
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

          <div className="flex gap-2 flex-col md:flex-row items-center">
            <label
              htmlFor="district"
              className="capitalize self-start w-[260px] text-gray-500 text-base"
            >
              ngày sinh
            </label>
            <div className="flex  flex-col w-full">
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
              className={`mb-4  w-[25%] ml-auto uppercase  bg-primary px-4 py-4 text-sm font-semibold text-white  `}
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
