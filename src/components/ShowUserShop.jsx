import shopApi from '@/apis/modules/shop.api'
import { updateShop } from '@/redux/features/userSlice'
import { districts, provinces } from '@/utilities/provinceCity'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

import { Button } from './ui/button'
import { Input } from './ui/input'

const ShowUserShop = () => {
  const { shop } = useSelector(state => state.user)
  const [onRequest, setOnRequest] = useState(false)
  const [selectedProvince, setSelectedProvince] = useState('')
  const [provinceOptions, setProvinceOptions] = useState(provinces)
  const [districtOptions, setDistrictOptions] = useState(districts)

  const dispatch = useDispatch()

  const initialValues = {
    title: shop?.title,
    address: shop?.address ? shop?.address : '',
    city: shop?.city ? shop?.city : '',
    district: shop?.district ? shop?.district : '',
  }

  const form = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(8, 'title minimum 8 character')
        .required('title is required'),
      address: Yup.string()
        .min(10, 'address minimum 10 character')
        .required('address is required'),
    }),
    onSubmit: async values => onUpdate(values),
  })

  const onUpdate = async values => {
    if (onRequest) return
    setOnRequest(true)
    if (JSON.stringify(values) === JSON.stringify(initialValues)) return

    const action = shop ? shopApi.update : shopApi.add

    const { response, err } = await action({
      ...values,
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
      <div className="mt-[50px] max-w-[600px] px-4 md:ml-[-50px]  ">
        <form onSubmit={form.handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2  md:flex-row">
            <label
              htmlFor="title"
              className="w-full text-base capitalize text-gray-500 md:w-[260px]"
            >
              Tên shop
            </label>
            <div className="flex w-full flex-col">
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

          <div className="flex flex-col items-center gap-2 md:flex-row">
            <label
              htmlFor="address"
              className="w-[260px] self-start text-base capitalize text-gray-500"
            >
              Địa chỉ
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

          <div className="mt-6 flex ">
            <div className="w-[266px]"></div>

            <Button className="ml-auto px-6" type="submit" disabled={onRequest}>
              Lưu
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ShowUserShop
