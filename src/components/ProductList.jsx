import React from "react";
import ProductItem from "./ProductItem";

const ProductList = () => {
  return (
    <div className="home-product home-product--spacing-bottom">
      <div className="row sm-gutter">
        {/* <!-- Product item --> */}
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </div>
  );
};

export default ProductList;
