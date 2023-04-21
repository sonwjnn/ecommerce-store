import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { PulseLoader } from 'react-spinners'
import { css } from '@emotion/react'
import AppBar from '../common/AppBar.jsx'

const override = css`
  display: 'block';
  margin: '0 auto';
  bordercolor: 'red';
`

const ProductLoading = () => {
  const { productLoading } = useSelector(state => state.productLoading)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (productLoading) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [productLoading])

  return (
    <>
      {isLoading ? (
        <>
          <div className="mt-[10px] h-full w-full z-50 relative bg-white">
            <div className="absolute top-[25%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <PulseLoader
                color={'#888888'}
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
