import * as Yup from 'yup'
import { useFormik } from 'formik'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import LoadingButton from './LoadingButton'
import { Input } from './ui/input'
import shopApi from '@/apis/modules/shop.api'
import { provinces, districts } from '@/utilities/provinceCity'
import { updateShop } from '@/redux/features/userSlice'

const ShowUserShop = () => {
  const { shop } = useSelector(state => state.user)
  const [onRequest, setOnRequest] = useState(false)
  const [selectedProvince, setSelectedProvince] = useState('')
  const [provinceOptions, setProvinceOptions] = useState(provinces)
  const [districtOptions, setDistrictOptions] = useState(districts)

  const dispatch = useDispatch()

  const initialValues = {
    title: shop.title,
    address: shop.address ? shop.address : '',
    city: shop.city ? shop.city : '',
    district: shop.district ? shop.district : ''
  }

  const form = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(8, 'title minimum 8 character')
        .required('title is required'),
      address: Yup.string()
        .min(10, 'address minimum 10 character')
        .required('address is required')
    }),
    onSubmit: async values => onUpdate(values)
  })

  const onUpdate = async values => {
    if (onRequest) return
    setOnRequest(true)
    if (JSON.stringify(values) === JSON.stringify(initialValues)) return

    const action = shop ? shopApi.update : shopApi.add

    const { response, err } = await action({
      ...values
    })

    setOnRequest(false)

    if (err) toast.error(err.message)
    if (response) {
      dispatch(updateShop(values))
      toast.success('Added shop successfully!')
    }
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
              htmlFor="title"
              className="capitalize text-base  text-gray-500 w-full md:w-[260px]"
            >
              Tên shop
            </label>
            <div className="flex flex-col w-full">
              <Input
                type="title"
                name="title"
                id="title"
                value={form.values.title}
                onChange={form.handleChange}
              />
              {form.errors.title && (
                <p className="errMsg ">{form.errors.title}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 flex-col md:flex-row items-center">
            <label
              htmlFor="address"
              className="capitalize self-start w-[260px] text-gray-500 text-base"
            >
              Địa chỉ
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
              Thành phố
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

export default ShowUserShop
