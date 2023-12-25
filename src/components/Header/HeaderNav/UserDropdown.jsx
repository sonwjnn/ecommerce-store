import { UserIcon } from '@/components/Icon'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { setUser } from '@/redux/features/userSlice'
import { LuBox, LuHeart, LuLogOut, LuMenu, LuUserCircle2 } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

const UserDropdown = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const pathname = useLocation().pathname
  const { user } = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(setUser(null))
    if (pathname.includes('/user')) {
      navigate('/')
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div role="button" className="flex w-full items-center p-3 text-sm ">
          <div className="flex cursor-pointer items-center gap-x-2 rounded-full bg-white bg-opacity-70  p-2 py-1 pl-[14px]">
            <LuMenu size={18} className="text-[#717171] " />
            <Avatar className="size-8">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-50"
        align="end"
        alignOffset={11}
        forceMount
      >
        <div className=" flex min-w-0 items-center gap-x-2 p-2">
          <div className="rounded-md p-1">
            <Avatar className="size-8">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>
                <UserIcon size={32} />
              </AvatarFallback>
            </Avatar>
          </div>
          <span className="line-clamp-1 text-pretty text-start font-medium">
            {user?.name}
          </span>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground "
        >
          <div
            onClick={() => navigate('/user/account/profile')}
            className="flex items-center gap-x-2.5"
          >
            <LuUserCircle2 />
            <button>Quản lí tài khoản</button>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground "
        >
          <div
            onClick={() => navigate('/user/orders')}
            className="flex items-center  gap-x-2.5"
          >
            <LuBox className="mt-1" />
            <button>Đơn mua</button>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground "
        >
          <div
            onClick={() => navigate('/user/favorite')}
            className="flex items-center gap-x-2.5"
          >
            <LuHeart className="mt-1" />
            <button>Yêu thích</button>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground focus:bg-red-100/75 focus:text-red-600"
        >
          <div onClick={handleLogout} className="flex items-center gap-x-2.5">
            <LuLogOut className="mt-1" />
            <button className=" flex justify-start">Đăng xuất</button>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown
