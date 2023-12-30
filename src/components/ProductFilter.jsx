import { useSelector } from 'react-redux'

import ProductGrid from './ProductGrid'

const ProductFilter = () => {
  const { products } = useSelector(state => state.products)

  return (
    <>
      {products?.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <ProductGrid products={[]} />
      )}
    </>
  )
}

export default ProductFilter
