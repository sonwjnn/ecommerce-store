import { cn } from '@/lib/utils'

export const Heading = ({ className, title, description }) => {
  return (
    <div className={cn('px-4 py-6 text-[#242424]', className)}>
      <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
      <p className="text-sm leading-7 text-muted-foreground">{description}</p>
    </div>
  )
}
