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

const formSchema = z
  .object({
    password: z.string().min(8, 'password minimum 8 character'),
    newPassword: z.string().min(8, 'new password minimum 8 character'),
    confirmNewPassword: z
      .string()
      .min(8, 'confirm new password minimum 8 character'),
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ['confirmNewPassword'],
  })

const PasswordUpdate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const title = 'Đổi mật khẩu'
  const description = 'Đổi mật khẩu tài khoản của bạn.'
  const toastMessage = 'Update password success! Please re-login'
  const action = 'Lưu thay đổi'

  const defaultValues = {
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async values => {
    try {
      if (loading) return
      setLoading(true)

      const { response, err } = await userApi.passwordUpdate(values)

      if (err) toast.error(err.message)
      if (response) {
        navigate('/')
        dispatch(setUser(null))
        toast.success(toastMessage)
      }
    } catch (error) {
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu cũ</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={loading}
                    placeholder="Nhập mật khẩu cũ ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu mới</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={loading}
                    placeholder="Nhập mật khẩu mới ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nhập lại</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={loading}
                    placeholder="Nhập lại mật khẩu mới ..."
                    {...field}
                  />
                </FormControl>
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

export default PasswordUpdate
