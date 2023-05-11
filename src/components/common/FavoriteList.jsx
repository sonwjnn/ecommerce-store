import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setGlobalLoading } from '../../redux/features/globalLoadingSlice'
import favoriteApi from '../../apis/modules/favorite.api'
import { shorterString } from '../../utilities/constants'
import { MdDelete } from 'react-icons/md'
import { removeFavorite } from '../../redux/features/userSlice'
import { toast } from 'react-toastify'

const FavoriteItem = props => {
  const {
    title,
    productImage,
    type,
    quantity,
    id,
    price,
    onRemoved,
    onCheckRemoved,
    handleCheckedFav,
    isCheckedAll,
    checkedFavs,
    handleDotPrice
  } = props

  const dispatch = useDispatch()
  const inputRef = useRef()
  const [isChecked, setIsChecked] = useState(false)
  const [onRequest, setOnRequest] = useState(false)

  const handleCheckFav = () => {
    setIsChecked(!isChecked)
    const currPrice = +price * favValue
    handleCheckedFav({ id, currPrice }, !isChecked)
  }

  const onRemove = async () => {
    if (onRequest) return
    setOnRequest(true)

    const { response, err } = await favoriteApi.remove({
      favoriteId: id
    })
    setOnRequest(false)

    if (err) toast.error(err.message)
    if (response) {
      dispatch(removeFavorite({ favId: id }))
      onRemoved({ id })
      toast.success('Remove favorite success!')
    }
  }

  const handleValueFav = state => {
    if (favState.increase == state) {
      setFavValue(favValue + 1)
    }
    if (favState.decrease == state) {
      if (favValue - 1 < 1) {
        setFavValue(1)
        return
      }
      setFavValue(favValue - 1)
    }
  }

  //constants
  const shortTitle = shorterString(title, 28)
  const urlImage = new URL(
    `../../assets/img/products/${productImage}`,
    import.meta.url
  ).href

  return (
    <div className="p-8 w-full pb-0 pt-0">
      <div className="p-6 flex   items-center justify-between  border-b-gray-200 border-b">
        <div className="flex items-center gap-8 self-start flex-grow">
          <input
            type="checkbox"
            checked={isChecked || isCheckedAll}
            name=""
            id=""
            ref={inputRef}
            className="w-6 h-6"
            onChange={handleCheckFav}
          />
          <div
            className="min-w-[80px] h-[80px] bg-no-repeat bg-center bg-cover "
            style={{
              backgroundImage: `url(${urlImage})`
            }}
          ></div>
          <div className="flex flex-col justify-center self-center">
            <div className="text-[16px] text-gray-500">{shortTitle}</div>
            <div className="text-[14px]">{type}</div>
          </div>
        </div>

        <div className="flex ml-[132px] self-center items-center">
          <div className=" text-primary text-[16px] px-12 mr-12">
            ₫{handleDotPrice(price)}
          </div>

          <button
            onClick={onRemove}
            className="text-red-600 mr-2 text-[24px] flex items-center px-3 py-2 justify-center   "
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  )
}

const FavoriteList = () => {
  const { user, listFavorites } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [favs, setFavs] = useState([])
  const [isCheckedAll, setCheckedAll] = useState(false)
  const [checkedFavs, setCheckedFavs] = useState([])

  useEffect(() => {
    const getListFavUser = async () => {
      const { response, err } = await favoriteApi.getList()

      if (response) {
        setFavs(response)
      }
    }
    getListFavUser()
  }, [dispatch])

  const onRemoved = ({ id, ids }) => {
    if (id) {
      const newFavs = [...favs].filter(e => e._id !== id)
      setFavs(newFavs)
    } else if (ids) {
      const newFavs = [...favs].filter(e => !ids.includes(e._id))
      setFavs(newFavs)
    }
    // setFilteredMedias([...newCarts].splice(0, page * skip))
    // setCount(page - 1)
  }

  useEffect(() => {
    if (isCheckedAll) {
      setCheckedFavs(favs.map(fav => fav._id))
    } else {
      setCheckedFavs([])
    }
  }, [isCheckedAll])

  const handleCheckedFav = ({ id, currPrice, isFavorValue }, isChecked) => {
    if (isFavorValue) {
      let checkedFavChange = checkedFavs.find(item => item.id === id)
      if (checkedFavChange) {
        checkedFavChange.currPrice = currPrice
        let newCheckedFavs = checkedFavs.slice()

        setCheckedFavs(newCheckedFavs)
      }
      return
    }
    if (isChecked) {
      setCheckedFavs([...checkedFavs, { id, currPrice }])
    } else {
      setCheckedFavs(checkedFavs.filter(item => item.id !== id))
    }
  }

  const onCheckedAll = () => {
    setCheckedAll(!isCheckedAll)
  }

  const onCheckRemoved = ids => {
    let newFavs = [...favs]
    ids.forEach(id => {
      newFavs.filter(e => e._id !== id)
    })
    setFavs(newFavs)
  }
  const handleDotPrice = price => {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  const handleRemoveFavs = async () => {
    if (!checkedFavs.length) return
    const newCheckedFavs = checkedFavs.map(item => item.id)
    const { response, err } = await favoriteApi.removeFavs({
      favIds: newCheckedFavs
    })
    // setOnRequest(false)

    if (err) toast.error(err.message)
    if (response) {
      dispatch(removeFavs({ favIds: newCheckedFavs }))
      onRemoved({ ids: newCheckedFavs })
      setCheckedFavs([])
      toast.success('Remove favorites success!')
    }
  }

  return (
    <div className="rounded-md min-h-[80vh] w-full bg-white mt-4">
      {favs.map((fav, index) => (
        <FavoriteItem
          id={fav._id}
          key={fav.productId}
          userId={fav.user}
          productId={fav.productId}
          price={fav.productPrice}
          title={fav.productTitle}
          type={fav.cateName}
          productImage={fav.productImage}
          quantity={fav.quantity}
          onRemoved={onRemoved}
          onCheckRemoved={onCheckRemoved}
          handleCheckedFav={handleCheckedFav}
          isCheckedAll={isCheckedAll}
          checkedFavs={checkedFavs}
          handleDotPrice={handleDotPrice}
        />
      ))}
    </div>
  )
}

export default FavoriteList
