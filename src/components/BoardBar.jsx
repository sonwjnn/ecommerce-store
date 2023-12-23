import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useLocation } from 'react-router-dom'

import { Button } from './ui/button'

const BoardBar = ({ handleSelectPriceOption }) => {
  return (
    <div className="mb-3">
      <div className=" hidden items-center  rounded-md md:flex">
        <span className="  mr-3 text-sm">Sắp xếp theo</span>
        <div className="flex gap-x-2">
          <Button className="border-none bg-white font-normal text-black  hover:bg-accent">
            Phổ biến
          </Button>
          <Button variant="secondary">Mới nhất</Button>
          <Button className="border-none bg-white font-normal text-black hover:bg-accent">
            Bán chạy
          </Button>
        </div>

        <div className="ml-2 w-[200px] rounded-md">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                role="button"
                className="flex w-full items-center justify-between rounded-md bg-white p-3 text-sm"
              >
                <span className=" text-sm text-[#242424]">Giá</span>
                <MdKeyboardArrowDown size={20} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-40"
              align="end"
              alignOffset={11}
              forceMount
            >
              <DropdownMenuItem
                asChild
                className="w-full cursor-pointer text-muted-foreground "
                onSelect={handleSelectPriceOption}
              >
                <button>Cao đến thấp</button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                asChild
                className="w-full cursor-pointer text-muted-foreground "
                onSelect={handleSelectPriceOption}
              >
                <button className=" flex justify-start">Thấp đến cao</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default BoardBar
