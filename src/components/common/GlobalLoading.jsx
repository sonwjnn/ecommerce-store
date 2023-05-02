import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { PulseLoader } from 'react-spinners'
import { css } from '@emotion/react'
import AppBar from '../common/AppBar.jsx'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

const override = css`
  display: 'block';
  margin: '0 auto';
  bordercolor: 'red';
`

const GlobalLoading = () => {
  const { globalLoading } = useSelector(state => state.globalLoading)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (globalLoading) {
      disableBodyScroll(document)
      setLoading(true)
    } else {
      setTimeout(() => {
        setLoading(false)
        enableBodyScroll(document)
      }, 1000)
    }
  }, [globalLoading])

  return (
    <>
      {isLoading ? (
        <>
          <div className=" h-screen top-0 left-0 w-full z-50 fixed transition-all bg-white">
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
