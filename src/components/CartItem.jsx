import { useState } from 'react'
const cartState = {
  increase: 'increase',
  decrease: 'decrease'
}
const CartItem = () => {
  const [cartValue, setCartValue] = useState(1)

  const handleValueCart = state => {
    if (cartState.increase == state) {
      setCartValue(cartValue + 1)
    }
    if (cartState.decrease == state) {
      if (cartValue - 1 < 1) {
        setCartValue(1)
        return
      }
      setCartValue(cartValue - 1)
    }
  }

  const urlImgage = `/src/assets/img/products/akko_507B_plus_dragonball-1681736804054-891761377.png`
  return (
    <div className="p-8 w-full">
      <div className="p-6 flex items-center justify-between  border-b-gray-200 border-b">
        <div className="flex items-center gap-8 flex-grow">
          <input type="checkbox" name="" id="" className="w-6 h-6" />
          <div
            className="w-[80px] h-[80px] bg-no-repeat bg-center bg-cover "
            style={{
              backgroundImage: `url(${urlImgage})`
            }}
          ></div>
        </div>

        <div className="flex gap-[60px] items-center">
          <div className="text-primary text-[16px] px-12">₫52.000</div>

          <div className=" font-normal">
            <div className="flex gap-4 items-center">
              <span className="flex items-center">
                <span
                  className="flex items-center select-none px-5 h-12  text-[20px] text-gray-600 border border-gray-300 cursor-pointer"
                  onClick={() => handleValueCart(cartState.decrease)}
                >
                  <span>-</span>
                </span>
                <span className="select-none px-5 h-12 py-1 text-[16px] text-gray-600 border border-gray-300">
                  {cartValue}
                </span>
                <span
                  className="flex items-center select-none h-12 px-4 text-[20px] text-gray-600 border border-gray-300 
                      cursor-pointer"
                  onClick={() => handleValueCart(cartState.increase)}
                >
                  <span>+</span>
                </span>
              </span>
            </div>
          </div>

          <div className="text-primary text-[16px] px-12">₫104.000</div>

          <button className="btn-primary py-2">Xoá</button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
