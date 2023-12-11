import { Link } from 'react-router-dom'

const CategoryItem = ({ index, cateName, disable }) => {
  return (
    <Link
      className={`cursor-pointer ${
        disable && 'cate-disable pointer-events-none select-none'
      } relative flex  h-[50%] items-center gap-x-2  rounded-md px-4  py-2 transition hover:bg-accent`}
      to={`/products/${cateName}/Tất cả sản phẩm`}
    >
      <div
        className="min-h-[40px] min-w-[40px] self-start bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${
            new URL(
              `../assets/img/cates/cates_${index + 1}.png`,
              import.meta.url
            ).href
          })`,
        }}
      ></div>
      <div
        className={` line-clamp-2  flex items-center justify-center text-sm `}
        key={index}
      >
        {cateName}
      </div>
    </Link>
  )
}

export default CategoryItem
