import ProductItem from './ProductItem'

const ProductGrid = ({ products }) => {
  return (
    <div className=" min-h-[700px]">
      <div className="flex flex-wrap sm:grid sm:grid-cols-15 gap-3 relative">
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
