import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { ClipLoader } from 'react-spinners'
import { css } from '@emotion/react'

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
          <div className=" mt-[10px] min-h-[65vh] w-full z-49 relative bg-white">
            <div className="absolute top-[25%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
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
