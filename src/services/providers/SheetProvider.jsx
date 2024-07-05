import AccountSheet from '@/components/sheets/AccountSheet'
import CategorySheet from '@/components/sheets/CategorySheet'
import FilterSheet from '@/components/sheets/FilterSheet'
import ShopCategorySheet from '@/components/sheets/ShopCategorySheet'

const SheetProvider = () => {
  return (
    <>
      <CategorySheet />
      <FilterSheet />
      <ShopCategorySheet />
      <AccountSheet />
    </>
  )
}

export default SheetProvider
