import { css } from '@emotion/react'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { PulseLoader } from 'react-spinners'

import Header from './Header/Header'

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
          <div className=" fixed left-0 top-0 z-50 h-screen w-full bg-white transition-all">
            <Header className="z-51" />
            <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
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
