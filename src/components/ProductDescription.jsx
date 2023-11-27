import parse from 'html-react-parser'
import { Link } from 'react-router-dom'

const ProductDescription = ({ product }) => {
  return (
    <div className="rounded-md bg-white px-0 md:p-10">
      <div className="h-full w-full">
        <div className="w-full rounded-md bg-[#fafafa]  px-6 py-5 text-xl font-medium capitalize text-[#242424]">
          chi tiết sản phẩm
        </div>
        <div className="flex gap-4 px-6 py-5 capitalize">
          <span className="w-[120px] text-sm font-medium text-[#242424]">
            danh mục
          </span>
          <span className="text-sm">
            <Link to={`/`} className="font-normal text-blue-600">
              shopee
            </Link>
            {'>'}
            <Link
              to={`/products/${product?.cateId?.name}/Tất cả sản phẩm`}
              className="font-normal text-blue-600"
            >
              {product?.cateId?.name}
            </Link>
            {'>'}
            <Link
              to={`/products/${product?.cateId?.name}/${product?.typeId?.name}`}
              className="font-normal text-blue-600"
            >
              {product?.typeId?.name}
            </Link>
          </span>
        </div>

        <div className="flex gap-4 px-6 py-5 capitalize">
          <span className="w-[120px] text-sm font-medium text-[#242424]">
            kho hàng
          </span>
          <span className=" text-sm font-normal text-gray-600">
            {product?.quantity}
          </span>
        </div>

        <div className="flex gap-4 px-6 py-5 capitalize">
          <span className="w-[120px] text-sm font-medium text-[#242424]">
            gửi từ
          </span>
          <span className=" text-sm font-normal text-gray-600">
            {product?.shopId?.city}
          </span>
        </div>
      </div>
      <div className="mt-8">
        <div className="w-full rounded-md bg-[#fafafa] px-6  py-5 text-xl font-medium capitalize text-[#242424]">
          mô tả sản phẩm
        </div>

        <div className="flex gap-4 px-6 py-5 capitalize">
          {parse(product?.info || '')}
        </div>
      </div>
    </div>
  )
}

export default ProductDescription
