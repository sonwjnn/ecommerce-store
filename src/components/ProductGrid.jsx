import { useEffect } from 'react'

import ProductItem from './ProductItem'

const ProductGrid = ({ products }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [products])
  return (
    <div>
      <div className="relative flex flex-wrap gap-3 sm:grid sm:grid-cols-15">
        {products.map(product => (
          <ProductItem
            className={
              'flex-[49%] sm:col-span-5 md:col-span-5 product_md:col-span-3'
            }
            product={product}
            key={product._id}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid
