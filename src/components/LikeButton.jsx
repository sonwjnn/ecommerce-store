import { HeartIcon } from './Icon'
import { CheckboxHeart } from './ui/checkbox-heart'

const LikeButton = ({ isFavorite, onFavoriteClick, loading }) => {
  return (
    <div className="add-to-wishlist h-10 w-10">
      <CheckboxHeart
        id={`checkbox__like_button`}
        name={'wishlist'}
        disabled={loading}
        checked={isFavorite}
        label={<HeartIcon />}
        onChange={onFavoriteClick}
      />
    </div>
  )
}

export default LikeButton
