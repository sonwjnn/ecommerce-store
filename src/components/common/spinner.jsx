import { cn } from '@/utils/helpers'
import { cva } from 'class-variance-authority'
import { LuLoader2 } from 'react-icons/lu'

const spinnerVariants = cva('text-primary-foreground animate-spin', {
  variants: {
    size: {
      default: 'h-4 w-4',
      sm: 'h-2 w-2',
      lg: 'h-6 w-6',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export const Spinner = ({ className, size }) => {
  return <LuLoader2 className={cn(spinnerVariants({ size }), className)} />
}
