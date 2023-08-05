import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import favoriteUtils from '../../utilities/favorite.utils'
import { useSelector } from 'react-redux'
import { AiFillHeart } from 'react-icons/ai'
import productApi from '../../apis/modules/product.api'
import { toast } from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'

const ProductItem = ({ product, className }) => {
  const [imageUrl, setImageUrl] = useState('')
  const { listFavorites } = useSelector(state => state.user)

  useEffect(() => {
    const getImage = async () => {
      const { response, err } = await productApi.getImage({
        imageName: product.imageName
      })

      if (err) toast.error(err.message)
      if (response) {
        setImageUrl(`data:image/png;base64,${response}`)
      }
    }

    getImage()
  }, [])

  const history = useNavigate()

  const productDetail = () => {
    history(`/products/detail/${product.id}`)
  }
  return (
    <div className={twMerge(className)}>
      <div className="home-product-item cursor-pointer" onClick={productDetail}>
        <div
          className="home-product-item__img bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        {/* <img src={imageUrl} alt="Product" /> */}
        <h2 className="home-product-item__title">{product.name}</h2>
        <div className="home-product-item__tag-red mt-0">Mua 3 & giảm 5%</div>
        <div className="home-product-item__price">
          {product.discount && product.discount !== '0' && (
            <span className="home-product-item__sale-price text-[14px] mr-1 text-gray-500 line-through">
              <a href="" className="text-sm text-gray-500">
                đ
              </a>
              {product.price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </span>
          )}

          <span className="home-product-item__sale-price">
            <a href="" className="text-sm">
              đ
            </a>
            {product.discountPrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </span>
          {/* <span className="home-product-item__freeship">
            <svg
              className="home-product-item__freeship-img shopee-svg-icon icon-free-shipping"
              height="12"
              viewBox="0 0 20 12"
              width="20"
            >
              <g fill="none" fillRule="evenodd" transform="">
                <rect
                  fill="#00bfa5"
                  fillRule="evenodd"
                  height="9"
                  rx="1"
                  width="12"
                  x="4"
                ></rect>
                <rect
                  height="8"
                  rx="1"
                  stroke="#00bfa5"
                  width="11"
                  x="4.5"
                  y=".5"
                ></rect>
                <rect
                  fill="#00bfa5"
                  fillRule="evenodd"
                  height="7"
                  rx="1"
                  width="7"
                  x="13"
                  y="2"
                ></rect>
                <rect
                  height="6"
                  rx="1"
                  stroke="#00bfa5"
                  width="6"
                  x="13.5"
                  y="2.5"
                ></rect>
                <circle cx="8" cy="10" fill="#00bfa5" r="2"></circle>
                <circle cx="15" cy="10" fill="#00bfa5" r="2"></circle>
                <path
                  d="m6.7082481 6.7999878h-.7082481v-4.2275391h2.8488017v.5976563h-2.1405536v1.2978515h1.9603297v.5800782h-1.9603297zm2.6762505 0v-3.1904297h.6544972v.4892578h.0505892c.0980164-.3134765.4774351-.5419922.9264138-.5419922.0980165 0 .2276512.0087891.3003731.0263672v.6210938c-.053751-.0175782-.2624312-.038086-.3762568-.038086-.5122152 0-.8758247.3017578-.8758247.75v1.8837891zm3.608988-2.7158203c-.5027297 0-.8536919.328125-.8916338.8261719h1.7390022c-.0158092-.5009766-.3446386-.8261719-.8473684-.8261719zm.8442065 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187zm2.6224996-1.8544922c-.5027297 0-.853692.328125-.8916339.8261719h1.7390022c-.0158091-.5009766-.3446386-.8261719-.8473683-.8261719zm.8442064 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187z"
                  fill="#fff"
                ></path>
                <path d="m .5 8.5h3.5v1h-3.5z" fill="#00bfa5"></path>
                <path d="m0 10.15674h3.5v1h-3.5z" fill="#00bfa5"></path>
                <circle cx="8" cy="10" fill="#047565" r="1"></circle>
                <circle cx="15" cy="10" fill="#047565" r="1"></circle>
              </g>
            </svg>
          </span> */}
        </div>
        <div className="home-product-item__action items-center">
          <span className="home-product-item__favorite home-product-item__favorite--liked">
            {favoriteUtils.check({
              listFavorites,
              productId: product.id
            }) && <AiFillHeart className="text-red-600 text-[13px]" />}
          </span>
          <span className="home-product-item__rate flex items-center">
            <i className="home-product-item__icon-star--gold  fa-solid fa-star text-[10px]"></i>
            <i className="home-product-item__icon-star--gold fa-solid fa-star text-[10px]"></i>
            <i className="home-product-item__icon-star--gold fa-solid fa-star text-[10px]"></i>
            <i className="home-product-item__icon-star--gold fa-solid fa-star text-[10px]"></i>
            <i className="home-product-item__icon-star fa-solid fa-star text-[10px]"></i>
            <span className="home-product-item__buy-num ">Đã bán 989</span>
          </span>
        </div>
        <div className="home-product-item__location">TP. Hồ Chí Minh</div>
        {+product.favorites > 1 && (
          <div className="home-product-item__love">
            <span>Yêu thích</span>
          </div>
        )}
        {product.discount && product.discount !== '0' && (
          <div className="home-product-item__sale-off-percent">
            <span className="home-product-item__percent">
              {product.discount}%
            </span>
            <span className="home-product-item__up">GIẢM</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductItem
