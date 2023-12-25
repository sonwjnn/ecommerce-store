import userApi from '@/apis/modules/user.api'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { updateUser } from '@/redux/features/userSlice'
import { districts, provinces } from '@/utilities/provinceCity'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { LuCalendar } from 'react-icons/lu'
import { useDispatch } from 'react-redux'
import * as z from 'zod'

import { Spinner } from './spinner'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
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
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Separator } from './ui/seperator'

const formSchema = z.object({
  username: z.string().min(8, 'username minimum 8 character'),
  name: z.string().min(8, 'display name minimum 8 character'),
  email: z.string().min(8, 'email minimum 8 character').email('invalid email'),
  phone: z
    .string()
    .min(10, 'phone minimum 10 character')
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'invalid phone number'),
  address: z.string().min(10, 'address minimum 10 character'),
  city: z.string().trim().min(1, 'city is required'),
  district: z.string().trim().min(1, 'district is required'),
  sex: z.string().min(3, 'sex minimum 3 character'),
  birthday: z.preprocess(arg => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date(arg)
  }, z.date()),
})

const ProfileUpdate = ({ initialData }) => {
  const [loading, setLoading] = useState(false)
  const [selectedProvince, setSelectedProvince] = useState('')
  const [provinceOptions, setProvinceOptions] = useState(provinces)
  const [districtOptions, setDistrictOptions] = useState(districts)
  const dispatch = useDispatch()

  const title = 'Cập nhật hồ sơ'
  const description = 'Thông tin chi tiết tài khoản'
  const toastMessage = 'Update profile success!'
  const action = 'Lưu thay đổi'

  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : {
        username: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        district: '',
        sex: '',
        birthday: null,
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

      const { response, err } = await userApi.profileUpdate({
        ...values,
      })

      if (err) toast.error(err.message)
      if (response) {
        dispatch(
          updateUser({
            ...values,
            birthday: format(values.birthday, 'yyyy-MM-dd'),
          })
        )
        toast.success(toastMessage)
      }
    } catch (error) {
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên đăng nhập</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập tên đăng nhập ..."
                    {...field}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên tài khoản</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Nhập tên tài khoản ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Nhập email ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Nhập số điện thoại ..."
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
                    placeholder="Nhập địa chỉ ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
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
                      {provinceOptions.map((province, index) => (
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
                    disabled={loading || !selectedProvince}
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
          </div>

          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Giới tính</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center gap-x-6 ">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal">Nam</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal">Nữ</FormLabel>
                      </FormItem>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Ngày sinh</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-[240px] border-input pl-3 text-left font-normal text-[#242424]',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'dd/MM/yyyy')
                        ) : (
                          <span>Chọn ngày sinh</span>
                        )}
                        <LuCalendar className="ml-auto size-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={date =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                      captionLayout="dropdown-buttons"
                      fromYear={1923}
                      toYear={2023}
                      // numberOfMonths={2} //Add this line, if you want, can be 2 or more
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>

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

export default ProfileUpdate
