import { useSelector } from 'react-redux'
import Logo from './Logo.jsx'
import { useState, useEffect } from 'react'

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
        <div className="h-screen w-screen z-50 fixed transition-all bg-slate-300">
          <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-600">
            <div className="h-1 bg-primary" style={{ width: '45%' }}></div>
          </div>
          <div className="absolute top-[50%] left-[50%] translate-x-[50%] translate-y-[50%]">
            <Logo />
          </div>
        </div>
      ) : null}
    </>
  )
}

export default GlobalLoading
