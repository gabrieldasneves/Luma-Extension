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
          ? 'bg-luma-amber-400 shadow-[0_0_5px_2px_rgba(245,166,35,0.5)]'
          : 'bg-luma-slate-600',
        className
      )}
    />
  )
}
