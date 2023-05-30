import { useState, useEffect } from 'react'
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
      className={` min-w-[50px] text-center cursor-pointer btn-base  $ ${className} ${
        isLoading && `bg-white border-2 border-[${colorLoading}] `
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
