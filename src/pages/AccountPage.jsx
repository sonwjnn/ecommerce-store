import { FaRegUser, FaUserCircle } from 'react-icons/fa'
import { SiReacthookform } from 'react-icons/si'
import { BsBell } from 'react-icons/bs'
import { AiOutlineTags } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import userApi from '../apis/modules/user.api'
import { setUser } from '../redux/features/userSlice'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

const AccountPage = () => {
  const { user } = useSelector(state => state.user)
  const [activeAccount, setActiveAccount] = useState(null)
  const { accountType } = useParams()

  useEffect(() => {}, [])

  const maxLength = 10
  let shorterName
  if (user.name.length > maxLength) {
    shorterName = user.name.substring(0, maxLength) + '...'
  }

  const actionsAccount = [
    ['profile', 'hồ sơ'],
    ['password', 'đổi mật khẩu']
  ]

  const [onRequest, setOnRequest] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const form = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, 'password minimum 8 character')
        .required('password is required'),
      newPassword: Yup.string()
        .min(8, 'new password minimum 8 character')
        .required('new password is required'),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'confirmNewPassword not match')
        .min(8, 'confirm new password minimum 8 character')
        .required('confirm new password is required')
    }),
    onSubmit: async values => onUpdate(values)
  })

  const onUpdate = async values => {
    // if (onRequest) return
    // setOnRequest(true)

    const { response, err } = await userApi.passwordUpdate(values)

    // setOnRequest(false)

    if (err) toast.error(err.message)
    if (response) {
      form.resetForm()
      navigate('/')
      dispatch(setUser(null))
      toast.success('Update password success! Please re-login')
    }
  }

  return (
    <div className="bg-bg_page px-0 xl:px-[136px] py-0 sm:py-[56px]   h-[80vh]">
      <div className=" h-full rounded-md max-w-[1220px]">
        <div className="grid grid-cols-6 h-full">
          <div className="bg-bg_page col-span-1 p-4">
            <div className="flex flex-col gap-6">
              <div className="flex gap-4 p-4">
                <div>
                  <FaUserCircle className=" text-[50px] text-gray-400" />
                </div>
                <div className="text-[16px] text-gray-600 font-semibold">
                  {shorterName}
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <FaRegUser className="self-start text-[22px] text-blue-600" />
                <div className="flex flex-col capitalize gap-3">
                  <span className="text-[16px]">tài khoản của tôi</span>
                  <div className="gap-2 flex flex-col">
                    {actionsAccount.map((action, index) => (
                      <Link
                        key={index}
                        to={`/user/account/${action[0]}`}
                        className={`action-account ${
                          activeAccount === index ? 'active' : ''
                        } capitalize text-gray-600  text-left text-[14px] ml-1`}
                        onClick={() => setActiveAccount(index)}
                      >
                        {action[1]}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <button className="flex gap-3 items-center">
                <SiReacthookform className="text-[22px] text-orange-700" />
                <span className="text-[16px] capitalize">đơn mua</span>
              </button>

              <button className="flex gap-3 items-center">
                <BsBell className="text-[22px] text-yellow-500" />
                <span className="text-[16px] capitalize">thông báo</span>
              </button>

              <button className="flex gap-3 items-center">
                <AiOutlineTags className="text-[20px] text-purple-500" />
                <span className="text-[16px] capitalize">kho vouncher</span>
              </button>
            </div>
          </div>
          <div className="bg-white col-span-5 rounded-md p-4">
            <div className="text-[24px] py-4 text-gray-600 px-8 capitalize border-b-gray-200 border-b">
              {accountType === 'password'
                ? 'đổi mật khẩu'
                : accountType === 'profile'
                ? 'hồ sơ'
                : ''}
            </div>
            {accountType === 'password' && (
              <div className="flex items-start justify-center">
                <div className="max-w-[600px] ml-[-100px] mt-[50px] px-4  ">
                  <form
                    onSubmit={form.handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex gap-2  items-center">
                      <label
                        htmlFor="password"
                        className="capitalize text-[16px] text-gray-500 w-[260px]"
                      >
                        mật khẩu
                      </label>
                      <input
                        type="password"
                        name="password"
                        className=" block w-full border-2 border-gray-300 rounded-md px-5  py-4 text-2xl"
                        id="password"
                        value={form.values.password}
                        onChange={form.handleChange}
                      />
                    </div>

                    <div className="flex gap-2  items-center">
                      <label
                        htmlFor="newPassword"
                        className="capitalize text-[16px] text-gray-500 w-[260px]"
                      >
                        mật khẩu mới
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        className=" block w-full border-2 border-gray-300 rounded-md px-5  py-4 text-2xl"
                        id="newPassword"
                        value={form.values.newPassword}
                        onChange={form.handleChange}
                      />
                    </div>

                    <div className="flex gap-2 items-center">
                      <label
                        htmlFor="confirmNewPassword"
                        className="capitalize w-[260px] text-gray-500 text-[16px]"
                      >
                        xác nhận mật khẩu
                      </label>
                      <input
                        className=" block w-full border-2 border-gray-300 rounded-md px-5  py-4 text-2xl"
                        type="password"
                        name="confirmNewPassword"
                        id="confirmNewPassword"
                        value={form.values.confirmNewPassword}
                        onChange={form.handleChange}
                      />
                    </div>

                    <div className="mt-6 flex ">
                      <div className="w-[266px]"></div>
                      <button
                        type="submit"
                        className="transition-all w-full uppercase rounded-md  bg-primary px-6 py-4 text-[14px] font-semibold text-white shadow-sm hover:brightness-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        xác nhận
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage
