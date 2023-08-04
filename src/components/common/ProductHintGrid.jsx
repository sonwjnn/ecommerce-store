import ProductItem from './ProductItem'

const ProductHintGrid = ({ products }) => {
  return (
    <div className=" min-h-[700px]">
      <div className="relative grid grid-cols-12 gap-3">
        {/* <!-- Product item --> */}
        {products.map(product => (
          <ProductItem
            className={'col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2'}
            product={product}
            key={product._id}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductHintGrid
