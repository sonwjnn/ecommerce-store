import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { Skeleton } from './skeleton'

const LazyImage = props => {
  const { src = '', alt = '' } = props
  const [isLoading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  const { ref, inView } = useInView({ threshold: 0, triggerOnce: true })

  useEffect(() => {
    if (inView && !mounted) {
      setMounted(true)
    }
  }, [inView])

  useEffect(() => {
    if (mounted) {
      const img = new Image()
      img.src = src

      img.onload = () => {
        setLoading(false)
      }
    }
  }, [src, mounted])

  return (
    <div className="h-full w-full" ref={ref}>
      {src ? (
        <img
          src={mounted ? src : ''}
          alt={alt}
          placeholder={mounted ? src : ''}
          className={cn('h-full w-full object-cover', {
            hidden: isLoading,
          })}
        />
      ) : (
        <Skeleton className="h-full w-full" />
      )}
    </div>
  )
}

export { LazyImage }
