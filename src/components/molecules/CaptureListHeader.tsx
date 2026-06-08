import { SectionLabel } from '@/components/atoms/SectionLabel'

interface CaptureListHeaderProps {
  count: number
}

export function CaptureListHeader({ count }: CaptureListHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <SectionLabel>CAPTURES</SectionLabel>
      <span className="text-metadata text-luma-slate-600">
        {count} saved
      </span>
    </div>
  )
}
