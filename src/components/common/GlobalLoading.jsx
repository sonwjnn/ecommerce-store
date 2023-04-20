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

const GlobalLoading = () => {
  const { globalLoading } = useSelector(state => state.globalLoading)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (globalLoading) {
      setLoading(true)
    } else {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }, [globalLoading])

  return (
    <>
      {isLoading ? (
        <>
          <div className=" h-screen w-screen z-50 fixed transition-all bg-white">
            <AppBar className="z-51" />
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
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

export default GlobalLoading
