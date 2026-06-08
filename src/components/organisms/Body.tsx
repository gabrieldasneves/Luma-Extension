import { SectionLabel } from '@/components/atoms/SectionLabel'
import { Divider } from '@/components/atoms/Divider'
import { LivePreview } from '@/components/molecules/LivePreview'
import { Toolbar } from '@/components/molecules/Toolbar'
import { CaptureListHeader } from '@/components/molecules/CaptureListHeader'
import { EmptyState } from '@/components/molecules/EmptyState'
import type { Capture } from '@/types'

interface BodyProps {
  liveText: string
  captures: Capture[]
  onPlay: () => void
  onAdd: () => void
}

export function Body({ liveText, captures, onPlay, onAdd }: BodyProps) {
  return (
    <section className="flex flex-1 flex-col gap-2 px-4 py-[14px]">
      <SectionLabel>LIVE SELECTION</SectionLabel>
      <LivePreview text={liveText || undefined} />
      <Toolbar canAdd={Boolean(liveText)} onPlay={onPlay} onAdd={onAdd} />
      <Divider />
      <CaptureListHeader count={captures.length} />
      {captures.length === 0 ? (
        <EmptyState />
      ) : null}
    </section>
  )
}
