import { cn } from '@/lib/utils'

const Container = ({ className, children }) => {
  return (
    <div className={cn('mx-auto my-32 max-w-7xl', className)}>{children}</div>
  )
}

export default Container
