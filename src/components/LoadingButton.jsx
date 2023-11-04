import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'

const LoadingButton = props => {
  const { children, loading, className, colorLoading, type, onClick, size } =
    props
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (loading) setIsLoading(true)
    else {
      setIsLoading(false)
    }
  }, [loading])
  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      className={` btn-base $ min-w-[50px] cursor-pointer  text-center ${className} ${
        isLoading && `border-2 bg-white border-[${colorLoading}] `
      }`}
    >
      {!isLoading ? (
        children
      ) : (
        <ClipLoader color={colorLoading} size={size || 15} />
      )}
    </button>
  )
}

export default LoadingButton
