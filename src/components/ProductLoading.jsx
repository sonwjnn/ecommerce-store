import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'

const override = css`
  display: 'block';
  margin: '0 auto';
  bordercolor: 'red';
`

const ProductLoading = () => {
  const { productLoading } = useSelector(state => state.productLoading)
  const { globalLoading } = useSelector(state => state.globalLoading)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (productLoading && !globalLoading) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [productLoading])

  return (
    <>
      {isLoading ? (
        <>
          <div className=" z-49 relative mt-[10px] min-h-[65vh] w-full bg-white">
            <div className="absolute left-[50%] top-[25%] translate-x-[-50%] translate-y-[-50%]">
              <ClipLoader
                color={'#00bfa5'}
                loading={isLoading}
                // cssOverride={override}
                // size={150}
              />
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default ProductLoading
