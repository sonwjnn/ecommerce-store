import { Button } from '@/components/ui/button'
import { onOpen as onCategoryOpen } from '@/services/redux/features/categorySheetSlice'
import { onOpen as onShopCategoryOpen } from '@/services/redux/features/shopCategorySheetSlice'
import { LuMenu } from 'react-icons/lu'
import { useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'

const MobileToggle = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const pathname = useLocation().pathname

  // const isHomeRoute = pathname === '/'
  const isShopRoute = params.shopId

  const onClick = () => {
    if (!isShopRoute) dispatch(onCategoryOpen())
    if (isShopRoute) dispatch(onShopCategoryOpen())
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="p-2 md:hidden"
      onClick={onClick}
    >
      <LuMenu size={22} />
    </Button>
  )
}

export default MobileToggle
