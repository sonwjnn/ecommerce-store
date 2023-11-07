import { BiSolidStar, BiSolidStarHalf, BiStar } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'

const Star = ({ stars, className }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <BiSolidStar className={twMerge(`star`, className)} />
        ) : stars >= number ? (
          <BiSolidStarHalf className={twMerge(`star`, className)} />
        ) : (
          <BiStar className={twMerge(`star`, className)} />
        )}
      </span>
    )
  })

  return <div className="flex gap-1">{ratingStar}</div>
}

export default Star
