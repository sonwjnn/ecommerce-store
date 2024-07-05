import ProductSidebar from '@/components/ProductSidebar'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { onClose } from '@/services/redux/features/filterSheetSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useMedia } from 'react-use'

const FilterSheet = () => {
  const dispatch = useDispatch()
  const { isOpen } = useSelector(state => state.filterSheet)
  const isMobile = useMedia('(max-width: 768px)', false)

  const handleClose = () => {
    dispatch(onClose())
  }

  if (!isMobile) return null

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent side="left" className="flex gap-0 p-0">
        <ProductSidebar className="w-full" />
      </SheetContent>
    </Sheet>
  )
}

export default FilterSheet
