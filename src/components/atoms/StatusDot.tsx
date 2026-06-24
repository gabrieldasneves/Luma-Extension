import { cn } from '@/lib/utils'

interface StatusDotProps {
  active?: boolean
  className?: string
}

export function StatusDot({ active = false, className }: StatusDotProps) {
  return (
    <span
      className={cn(
        'block h-[7px] w-[7px] rounded-full transition-colors duration-300',
        active
          ? 'bg-luma-mint shadow-[0_0_5px_2px_color-mix(in_srgb,var(--luma-mint)_50%,transparent)]'
          : 'bg-luma-charcoal',
        className
      )}
    />
  )
}
