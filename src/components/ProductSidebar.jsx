import productApi from '@/services/api/modules/product.api'
import {
  clearProductsStore,
  setProductsStore,
} from '@/services/redux/features/productSlice'
import { cn } from '@/utils/helpers'
import { provinces } from '@/utils/provinceCity'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BiSolidStar } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
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
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Separator } from './ui/seperator'
import { Slider } from './ui/slider'

const formSchema = z.object({
  city: z.string().trim().min(1, 'city is required'),
  price: z.array(z.number().min(0).max(1000000000)),
  rating: z.array(z.number().min(0).max(5)),
  order: z.number().min(0).max(2),
  totalPages: z.number().min(1),
  currentPage: z.number().min(1),
  count: z.number().min(0),
  limit: z.number().min(1),
})

const ProductSidebar = ({ className }) => {
  const { cateSlug } = useParams()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [lastSubmittedValues, setLastSubmittedValues] = useState(null)

  const defaultValues = {
    city: 'all',
    price: [0, 50000000],
    rating: [0, 5],
    order: 0,
    totalPages: 1,
    currentPage: 1,
    count: 0,
    limit: 18,
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const price = form.watch('price')

  const onSubmit = async values => {
    try {
      if (loading) return

      if (JSON.stringify(values) === JSON.stringify(lastSubmittedValues)) {
        return
      }

      if (values.price[0] > values.price[1]) {
        values.price = [values.price[1], values.price[0]]
      }
      setLoading(true)
      setLastSubmittedValues(values)
      dispatch(clearProductsStore())

      const { newPayload } = await productApi.getListByCategory(
        'category',
        cateSlug,
        { ...values }
      )

      if (newPayload) {
        dispatch(setProductsStore(newPayload.products))
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const getProductsInit = async () => {
      const { response, err } = await productApi.getProductsOfCateBySlug({
        cateSlug,
      })

      if (err) toast.error(err.message)
      if (response) {
        dispatch(setProductsStore(response))
      }
    }

    dispatch(clearProductsStore())
    getProductsInit()
  }, [])

  return (
    <div className={cn('w-[230px] rounded-md bg-white p-4 ', className)}>
      <header className="pointer-events-none flex select-none items-center px-2 py-3 text-xl font-medium ">
        Lọc sản phẩm
      </header>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 w-full space-y-8"
        >
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
                    <SelectItem value="all">Tất cả</SelectItem>
                    {provinces.map((province, index) => (
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
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đánh giá</FormLabel>
                <FormControl>
                  <Slider
                    defaultValue={defaultValues.rating}
                    max={5}
                    min={0}
                    step={1}
                    value={field.value}
                    onValueChange={field.onChange}
                    formatLabel={value => (
                      <div className="flex translate-x-[-1rem] translate-y-1 items-center px-1 font-medium ">
                        <span>{value}</span>
                        <BiSolidStar className="mt-[-4px] text-yellow-500" />
                      </div>
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá sản phẩm (VND)</FormLabel>
                <FormControl>
                  <div className="flex flex-col">
                    <Slider
                      defaultValue={defaultValues.price}
                      max={100000000}
                      min={0}
                      step={100000}
                      value={field.value}
                      onValueChange={field.onChange}
                      formatLabel={value => ``}
                    />

                    <div className="mt-[-8px] flex  gap-x-2">
                      <Input
                        type="number"
                        className="px-1 text-center"
                        value={price[0]}
                        onChange={e =>
                          field.onChange([+e.target.value, price[1]])
                        }
                      />
                      <Input
                        type="number"
                        className="px-1 text-center"
                        value={price[1]}
                        onChange={e =>
                          field.onChange([price[0], +e.target.value])
                        }
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-4 flex flex-col gap-4">
            <Button type="submit" disable={loading}>
              {loading && <Spinner className="text-white" />}
              Lọc
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ProductSidebar
