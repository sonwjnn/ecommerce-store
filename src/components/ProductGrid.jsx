import { useNavigate } from 'react-router-dom'

import ProductCard from './ProductCard'
import { Skeleton } from './ui/skeleton'

const ProductGrid = ({ products }) => {
  const navigate = useNavigate()
  return (
    <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
      {products.length ? (
        <>
          {products.map(product => (
            <ProductCard product={product} key={product._id} />
          ))}
        </>
      ) : (
        Array(18)
          .fill(0)
          .map((_, index) => (
            <div
              onClick={() => navigate(`/products/detail/undefinded`)}
              key={index}
              className={
                'flex cursor-pointer flex-col gap-y-2 rounded-md border bg-white p-2 hover:shadow-md'
              }
            >
              <div className="aspect-square overflow-hidden rounded-xl">
                <Skeleton className="aspect-square h-full w-full " />
              </div>
              <div className="pb-0 text-xs font-medium text-[#242424]">
                <Skeleton className="h-[28px] w-full " />
              </div>

              <div className="home-product-item__price m-0 flex-nowrap">
                <Skeleton className="ml-auto h-[20px] w-[70%]" />
              </div>
              <div className="home-product-item__action m-0 items-center">
                <Skeleton className="ml-auto h-[20px] w-[50%]  " />
              </div>
              <Skeleton className="h-[20px] w-full  " />
            </div>
          ))
      )}
    </div>
  )
}

export default ProductGrid
