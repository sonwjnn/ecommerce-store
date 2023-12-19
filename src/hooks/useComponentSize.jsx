import { useEffect, useState } from 'react'

export const useComponentSize = ref => {
  const [componentSize, setComponentSize] = useState({
    width: -1,
    height: -1,
  })

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const { clientHeight, clientWidth } = ref.current
        setComponentSize({ height: clientHeight, width: clientWidth })
      }
    }

    handleResize() // Initial size

    let observerRefValue = null
    const observer = new ResizeObserver(handleResize)
    if (ref.current) {
      observer.observe(ref.current)
      observerRefValue = ref.current
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue)
      }
    }
  }, [ref, ref.current?.clientHeight, ref.current?.clientWidth])

  return componentSize
}
