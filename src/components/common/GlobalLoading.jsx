import { useSelector } from 'react-redux'
import Logo from './Logo.jsx'
import { useState, useEffect } from 'react'

const GlobalLoading = () => {
  const { globalLoading } = useSelector(state => state.globalLoading)
  const [isLoading, setLoading] = useState(false)

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
          <div class="h-1 w-full bg-neutral-200 dark:bg-neutral-600">
            <div class="h-1 bg-primary" style="width: 45%"></div>
          </div>
          <div className="absolute top-[50%] left-[50%] translate-x-1/2 translate-y-1/2">
            <Logo />
          </div>
        </div>
      ) : null}
    </>
  )
}

export default GlobalLoading
