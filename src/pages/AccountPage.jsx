import { FaRegUser, FaUserCircle } from 'react-icons/fa'
import { SiReacthookform } from 'react-icons/si'
import { BsBell } from 'react-icons/bs'
import { AiOutlineTags } from 'react-icons/ai'
const AccountPage = () => {
  return (
    <div className="bg-bg_page px-0 xl:px-[136px] py-0 sm:py-[56px]   h-screen">
      <div className=" h-full rounded-md max-w-[1220px]">
        <div className="grid grid-cols-6 h-full">
          <div className="bg-bg_page col-span-1 p-4">
            <div className="flex flex-col gap-6">
              <div className="flex gap-4 p-4">
                <div>
                  <FaUserCircle className=" text-[50px] text-gray-400" />
                </div>
                <div className="text-[16px] text-gray-600 font-semibold">
                  hoangson
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <FaRegUser className="self-start text-[22px] text-blue-600" />
                <div className="flex flex-col capitalize gap-3">
                  <span className="text-[16px]">tài khoản của tôi</span>
                  <div className="gap-2 flex flex-col">
                    <button className="text-primary capitalize  text-left text-[14px] ml-1">
                      hồ sơ
                    </button>
                    <button className="text-[14px] capitalize text-left text-gray-600 ml-1">
                      đổi mật khẩu
                    </button>
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
            <div className="px-2 capitalize">đổi mật khẩu</div>
            <div>
              <div className="max-w-[400px] justify-start flex flex-col gap-4">
                <div className="flex gap-2">
                  <label htmlFor="newPassword" className="capitalize">
                    mật khẩu mới
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    className=" block w-full border-2 border-gray-300 rounded-md px-5  py-4 text-2xl"
                    id="newPassword"
                  />
                </div>

                <div className="flex gap-2">
                  <label htmlFor="confirmNewPassword" className="capitalize">
                    xác nhận mật khẩu
                  </label>
                  <input
                    className=" block w-full border-2 border-gray-300 rounded-md px-5  py-4 text-2xl"
                    type="password"
                    name="confirrmNewPassword"
                    id="confirrmNewPassword"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage
