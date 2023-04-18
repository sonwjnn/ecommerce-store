import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProductItem = props => {
  const { id, title, origin, info, date, price, imageName, cateName } = props
  const urlImgage = `/src/assets/img/products/${imageName}`

  const history = useNavigate()

  const productDetail = () => {
    history(`products/${cateName}/${id}`)
  }
  return (
    <div className="col l-2-4 c-6">
      <div className="home-product-item cursor-pointer" onClick={productDetail}>
        <div
          className="home-product-item__img bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url(${urlImgage})` }}
        ></div>
        <h2 className="home-product-item__title">{title}</h2>
        <div className="home-product-item__tag-red">Mua 3 & giảm 5%</div>
        <div className="home-product-item__price">
          <span className="home-product-item__sale-price">
            <a href="" className="currency">
              đ
            </a>
            {price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </span>
          <span className="home-product-item__freeship">
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
          </span>
        </div>
        <div className="home-product-item__action">
          <span className="home-product-item__favorite home-product-item__favorite--liked">
            <i className="home-product-item__icon-heart-empty fa-solid fa-heart"></i>
            <i className="home-product-item__icon-heart-fill fa-solid fa-heart"></i>
          </span>
          <span className="home-product-item__rate">
            <i className="home-product-item__icon-star--gold fa-solid fa-star"></i>
            <i className="home-product-item__icon-star--gold fa-solid fa-star"></i>
            <i className="home-product-item__icon-star--gold fa-solid fa-star"></i>
            <i className="home-product-item__icon-star--gold fa-solid fa-star"></i>
            <i className="home-product-item__icon-star fa-solid fa-star"></i>
            <span className="home-product-item__buy-num">Đã bán 989</span>
          </span>
        </div>
        <div className="home-product-item__location">TP. Hồ Chí Minh</div>
        <div className="home-product-item__love">
          <span>Yêu thích</span>
        </div>
        <div className="home-product-item__sale-off-percent">
          <span className="home-product-item__percent">10%</span>
          <span className="home-product-item__up">GIẢM</span>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
