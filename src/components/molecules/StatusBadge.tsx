import { cn } from '@/lib/utils'
import { StatusDot } from '@/components/atoms/StatusDot'
import type { ObservationStatus } from '@/types'

interface StatusBadgeProps {
  status: ObservationStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isObserving = status === 'observing'
  return (
    <div className="flex items-center gap-[6px]">
      <StatusDot active={isObserving} />
      <span
        className={cn(
          'text-metadata transition-colors duration-300',
          isObserving ? 'text-luma-mint' : 'text-luma-gray-400'
        )}
      >
        {status}
      </span>
    </div>
  )
}
