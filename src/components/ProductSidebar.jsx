import { formatPriceToVND } from '@/utils/formatting'
import { provinces } from '@/utils/provinceCity'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BiSolidStar } from 'react-icons/bi'
import { LuFilter } from 'react-icons/lu'
import * as z from 'zod'

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
  rating: z.array(z.number().min(1).max(5)),
})

const ProductSidebar = () => {
  const [loading, setLoading] = useState(false)

  const defaultValues = {
    city: 'TP. Hồ Chí Minh',
    price: [0, 20000000],
    rating: [4, 5],
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  // const { setValue } = form()

  const price = form.watch('price')

  const onSubmit = async values => {
    try {
      if (loading) return

      if (values.price[0] > values.price[1]) {
        values.price = [values.price[1], values.price[0]]
      }

      setLoading(true)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-[230px] rounded-md bg-white p-4 ">
      <header className="pointer-events-none flex select-none items-center py-3 text-xl font-medium ">
        <LuFilter className="mr-2 text-lg" />
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
                    defaultValue={[4, 5]}
                    max={5}
                    min={1}
                    step={1}
                    value={field.value}
                    onValueChange={field.onChange}
                    formatLabel={value => (
                      <div className="flex translate-x-[-1rem] translate-y-1 items-center  rounded-md bg-white  px-2 font-medium shadow-md">
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
                      defaultValue={[0, 20000000]}
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
