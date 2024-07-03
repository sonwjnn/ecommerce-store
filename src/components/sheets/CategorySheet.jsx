import Category from '@/components/Category'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { onClose } from '@/services/redux/features/categorySheetSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useMedia } from 'react-use'

const CategorySheet = () => {
  const dispatch = useDispatch()
  const { isOpen } = useSelector(state => state.categorySheet)
  const isMobile = useMedia('(max-width: 768px)', false)

  const handleClose = () => {
    dispatch(onClose())
  }

  if (!isMobile) return null

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent side="left" className="flex gap-0 p-0">
        <Category className="w-full" />
      </SheetContent>
    </Sheet>
  )
}

export default CategorySheet
