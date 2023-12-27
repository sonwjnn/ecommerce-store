import userApi from '@/services/api/modules/user.api'
import { setUser } from '@/services/redux/features/userSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'

import { Spinner } from './spinner'
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
  username: z.string().min(8, 'password minimum 8 character'),
  password: z.string().min(8, 'new password minimum 8 character'),
})

const SigninForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authPage = value => {
    navigate(`/auth/${value}`)
  }
  const [loading, setLoading] = useState(false)

  const title = 'Đăng nhập'
  const description = 'Đăng nhập tài khoản của bạn'
  const toastMessage = 'Login success!'
  const action = 'Đăng nhập'

  const defaultValues = {
    username: '',
    password: '',
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async values => {
    try {
      if (loading) return
      setLoading(true)
      const { response } = await userApi.signin(values)

      if (response) {
        dispatch(setUser(response))
        toast.success(toastMessage)

        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Heading className="px-0 py-0" title={title} description={description} />
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
                <FormLabel>Tên tài khoản</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Nhập tài khoản ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={loading}
                    placeholder="Nhập mật khẩu ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-6 flex flex-col gap-4">
            <Button type="submit" disable={loading}>
              {loading && <Spinner className="text-white" />}
              {action}
            </Button>

            <Button variant="outline" onClick={() => authPage('signup')}>
              Đăng kí
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default SigninForm
