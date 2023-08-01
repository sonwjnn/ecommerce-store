import ProductItem from './ProductItem'

const ProductGrid = ({ products }) => {
  return (
    <div className="home-product home-product--spacing-bottom min-h-screen">
      <div className="row sm-gutter relative">
        {/* <!-- Product item --> */}
        {products.map(product => (
          <ProductItem
            key={product._id}
            id={product._id}
            title={product.name}
            price={product.price}
            imageName={product.imageName}
            info={product.info}
            date={product.producedAt}
            origin={product.origin}
            typeName={product.typeId.name}
            cateName={product.cateId.name}
            isFavorite={product.isFavorite}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid
