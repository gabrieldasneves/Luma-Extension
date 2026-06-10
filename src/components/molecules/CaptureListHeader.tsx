import { cn } from '@/lib/utils'
import { SectionLabel } from '@/components/atoms/SectionLabel'

interface CaptureListHeaderProps {
  count: number
}

export function CaptureListHeader({ count }: CaptureListHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <SectionLabel>CAPTURES</SectionLabel>
      <span className={cn('text-metadata transition-colors', count > 0 ? 'text-luma-mint' : 'text-luma-charcoal')}>
        {count} saved
      </span>
    </div>
  )
}
