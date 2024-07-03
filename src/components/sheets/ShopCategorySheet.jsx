import ShopSidebar from '@/components/ShopSidebar'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { onClose } from '@/services/redux/features/shopCategorySheetSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useMedia } from 'react-use'

const ShopCategorySheet = () => {
  const dispatch = useDispatch()
  const { isOpen } = useSelector(state => state.shopCategorySheet)
  const isMobile = useMedia('(max-width: 768px)', false)

  const handleClose = () => {
    dispatch(onClose())
  }

  if (!isMobile) return null

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent side="left" className="flex gap-0 p-0">
        <ShopSidebar className="w-full" />
      </SheetContent>
    </Sheet>
  )
}

export default ShopCategorySheet
