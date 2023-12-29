import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import shopApi from '@/services/api/modules/shop.api'
import { updateShop } from '@/services/redux/features/userSlice'
import { districts, provinces } from '@/utils/provinceCity'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import * as z from 'zod'

import { Spinner } from './common/spinner'
import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Heading } from './ui/heading'
import { Input } from './ui/input'
import { Separator } from './ui/seperator'

const formSchema = z.object({
  title: z.string().min(8, 'title is required'),
  address: z.string().min(10, 'address is required'),
  city: z.string().min(1, 'city is required'),
  district: z.string().min(1, 'district is required'),
})

const ShopForm = ({ initialData }) => {
  const { shop } = useSelector(state => state.user)
  const [loading, setLoading] = useState(false)
  const [selectedProvince, setSelectedProvince] = useState('')
  const [provinceOptions, setProvinceOptions] = useState(provinces)
  const [districtOptions, setDistrictOptions] = useState(districts)

  const dispatch = useDispatch()

  const title = initialData ? 'Cập nhật Shop' : 'Đăng kí mở shop'
  const description = initialData
    ? 'Cập nhật thông tin Shop của bạn.'
    : 'Đăng kí trở thành người bán hàng.'
  const toastMessage = initialData
    ? 'Sign up shop success!'
    : 'Added shop success!'
  const action = initialData ? 'Lưu thay đổi' : 'Tạo shop'

  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : {
        title: '',
        address: '',
        city: '',
        district: '',
      }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const { watch, setValue } = form
  const city = watch('city')

  const onSubmit = async values => {
    try {
      if (loading) return
      setLoading(true)
      if (JSON.stringify(values) === JSON.stringify(defaultValues)) return

      const action = shop ? shopApi.update : shopApi.add

      const { response, err } = await action({
        ...values,
      })

      if (err) toast.error(err.message)
      if (response) {
        dispatch(updateShop(values))
        toast.success(toastMessage)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (city) {
      const provinceIndex = provinces.indexOf(city)
      const newDistricts = districts[provinceIndex]
      setDistrictOptions(newDistricts)
      setSelectedProvince(city)
      if (city !== defaultValues.city) {
        setValue('district', '')
      }
    }
  }, [city])

  return (
    <>
      <Heading className="py-0" title={title} description={description} />
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên shop</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Nhập tên shop của bạn ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Nhập mật dịa chỉ ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thành phố</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Chọn Thành phố"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[16rem] overflow-y-auto">
                    {provinceOptions?.map((province, index) => (
                      <SelectItem key={index} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quận / Huyện</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Chọn Quận/Huyện"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[16rem] overflow-y-auto">
                    {districtOptions?.map((district, index) => (
                      <SelectItem key={index} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full justify-end">
            <Button disabled={loading} type="submit">
              {loading && <Spinner className="text-white" />}
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default ShopForm
