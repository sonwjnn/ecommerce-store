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
import { LuMenu } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

const UserDropdown = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(setUser(null))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div role="button" className="flex w-full items-center p-3 text-sm ">
          <div className="flex cursor-pointer items-center gap-x-2 rounded-full bg-white bg-opacity-70  p-2 py-1 pl-[14px]">
            <LuMenu size={18} className="text-[#717171] " />
            <Avatar className="h-8 w-8">
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
        <div className="flex items-center gap-x-2 p-2">
          <div className="rounded-md bg-accent p-1">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-1">
            <p className="line-clamp-1 text-sm">{user?.name}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground "
        >
          <button onClick={() => navigate('/user/account/profile')}>
            Quản lí tài khoản
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground "
        >
          <button onClick={() => navigate('/user/orders')}>Đơn mua</button>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground "
        >
          <button onClick={() => navigate('/user/favorite')}>Yêu thích</button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground focus:bg-red-100/75 focus:text-red-600"
        >
          <button className=" flex justify-start" onClick={handleLogout}>
            Đăng xuất
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown
