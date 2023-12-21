import { useState } from 'react'
import { LuFilter } from 'react-icons/lu'

import StarVote from './StarVote'
import { Button } from './ui/button'

const ProductSidebar = () => {
  const [rating, setRating] = useState(3)

  return (
    <div className="w-[200px]">
      <div className="rounded-md bg-white">
        <header className="pointer-events-none flex select-none items-center p-3 text-base font-medium ">
          <LuFilter className="mr-2 text-lg" />
          Lọc sản phẩm
        </header>

        <div className="px-3 py-2">
          <h2 className="mb-2 text-sm font-medium">Nơi bán</h2>
          {/* Replace with your actual seller options */}
          <div className="flex gap-x-2 text-sm">
            <input
              type="checkbox"
              id="seller1"
              name="seller1"
              value="seller1"
            />
            <label htmlFor="seller1">TP. Hồ Chí Minh</label>
          </div>
          <div className="flex gap-x-2 text-sm">
            <input
              type="checkbox"
              id="seller2"
              name="seller2"
              value="seller2"
            />
            <label htmlFor="seller2">Hà Nội</label>
          </div>
          <div className="flex gap-x-2 text-sm">
            <input
              type="checkbox"
              id="seller2"
              name="seller2"
              value="seller2"
            />
            <label htmlFor="seller2">Hải Phòng</label>
          </div>

          <h2 className="mb-2 mt-4 text-sm font-medium">Đánh giá</h2>
          <div className="flex gap-4">
            <StarVote rating={rating} setRating={setRating} />
            <div className="text-sm text-gray-500">{rating}/5</div>
          </div>

          <h2 className="mb-2 mt-4 text-sm font-medium">Gía sản phẩm</h2>
          <input type="range" min="0" max="10000" />

          <Button variant="outline" className="mt-4 w-full">
            Lọc
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductSidebar
