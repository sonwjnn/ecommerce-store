import { AiOutlineStar } from 'react-icons/ai'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

const Star = ({ stars, className }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar className={twMerge(`star`, className)} />
        ) : stars >= number ? (
          <FaStarHalfAlt className={twMerge(`star`, className)} />
        ) : (
          <AiOutlineStar className={twMerge(`star`, className)} />
        )}
      </span>
    )
  })

  return <div className="flex gap-1">{ratingStar}</div>
}

export default Star
