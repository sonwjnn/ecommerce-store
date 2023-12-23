import ProductSidebar from '@/components/ProductSidebar'
import Container from '@/components/ui/container'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const CategoryLayout = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Container>
      <div className="flex gap-4 pt-0 lg:pt-[36px]">
        <div className="col hidden md:block">
          <ProductSidebar />
        </div>

        <div className="grow overflow-hidden">
          {/* <ProductList /> */}
          <Outlet />
        </div>
      </div>
    </Container>
  )
}

export default CategoryLayout
