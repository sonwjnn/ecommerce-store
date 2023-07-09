import { Link } from 'react-router-dom'

const CategoryItem = ({ index, cateName, disable }) => {
  return (
    <Link
      className={`cursor-pointer ${
        disable && 'cate-disable select-none pointer-events-none'
      } relative hover:border-gray-200 hover:shadow-sm flex flex-col items-center h-[50%]  px-2 py-4  border border-gray-100  row-span-${
        (index + 1) % 2 ? 1 : 2
      }`}
      to={`/products/${cateName}/Tất cả sản phẩm`}
    >
      <div
        className="bg-no-repeat mx-auto self-start bg-cover w-[70%] h-[80px]"
        style={{
          backgroundImage: `url(${
            new URL(
              `../../assets/img/cates/cate_${index + 1}.png`,
              import.meta.url
            ).href
          })`
        }}
      ></div>
      <div
        className={` text-[14px]  text-center flex items-center justify-center`}
        key={index}
      >
        {cateName}
      </div>
    </Link>
  )
}

export default CategoryItem
