import { Link } from 'react-router-dom'

const CategoryItem = ({ index, cateName, disable }) => {
  return (
    <Link
      className={`cursor-pointer ${
        disable && 'cate-disable pointer-events-none select-none'
      } relative flex h-[50%] flex-col items-center border border-gray-100  px-2 py-4  hover:border-gray-200 hover:shadow-sm  row-span-${
        (index + 1) % 2 ? 1 : 2
      }`}
      to={`/products/${cateName}/Tất cả sản phẩm`}
    >
      <div
        className="mx-auto h-[80px] w-[70%] self-start bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${
            new URL(
              `../assets/img/cates/cate_${index + 1}.png`,
              import.meta.url
            ).href
          })`,
        }}
      ></div>
      <div
        className={` flex  items-center justify-center text-center text-sm`}
        key={index}
      >
        {cateName}
      </div>
    </Link>
  )
}

export default CategoryItem
