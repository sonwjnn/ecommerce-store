import { useState } from 'react'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'

const StarVote = ({ rating, setRating }) => {
  const [hover, setHover] = useState(null)
  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              className="hidden"
              value={currentRating}
              onClick={() => setRating(currentRating)}
            />
            <FaStar
              className={`star cursor-pointer text-[20px] ${
                currentRating <= (hover || rating) ? '' : 'text-[#e4e5e9]'
              }`}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        )
      })}
    </div>
  )
}

export default StarVote
