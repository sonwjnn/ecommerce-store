import { setUser } from '@/redux/features/userSlice'
import { BiNotepad } from 'react-icons/bi'
import { FaRegUser } from 'react-icons/fa'
import { HiOutlineLogout } from 'react-icons/hi'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import TextAvatar from '../../TextAvatar'

const UserDropdown = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { user } = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(setUser(null))
  }
  return (
    <>
      <span className="h-[30px] w-[30px] ">
        <TextAvatar text={user.name} />
      </span>
      <span className="nav-list-item-user-name text-base">
        {user.name ? user.name : 'null'}
      </span>
      <ul className="nav-list-item-user-menu overflow-hidden rounded-md text-base">
        <li className="px-3 py-2 text-base text-black transition hover:bg-accent hover:text-primary">
          <Link
            to={'/user/account/profile'}
            className="flex items-center gap-x-2"
          >
            <FaRegUser />
            Tài khoản
          </Link>
        </li>
        <li className="px-3 py-2 text-base text-black transition hover:bg-accent hover:text-primary">
          <Link to={'/user/purchase'} className="flex items-center gap-x-2">
            <BiNotepad />
            <button>Đơn mua</button>
          </Link>
        </li>
        <li className="border-b border-b-neutral-300 px-3 py-2 text-base text-black transition hover:bg-accent hover:text-primary">
          <Link to={'/user/favorite'} className="flex items-center gap-x-2">
            <MdOutlineFavoriteBorder />
            <button>Yêu thích</button>
          </Link>
        </li>
        <li className="px-3 py-2 text-base text-black transition hover:bg-accent hover:text-primary">
          <Link
            to={location.pathname.includes('user') ? '/' : null}
            className="flex items-center gap-x-2"
          >
            <HiOutlineLogout className="text-red-500 " />
            <button onClick={handleLogout}>Đăng xuất</button>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default UserDropdown
