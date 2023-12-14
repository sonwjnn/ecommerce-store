import ProductCard from './ProductCard'

const ProductHintGrid = ({ products }) => {
  return (
    <div className=" min-h-[700px]">
      <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {products.map(product => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  )
}

export default ProductHintGrid
