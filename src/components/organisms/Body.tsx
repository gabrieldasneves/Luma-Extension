import { SectionLabel } from '@/components/atoms/SectionLabel'
import { Divider } from '@/components/atoms/Divider'
import { LivePreview } from '@/components/molecules/LivePreview'
import { Toolbar } from '@/components/molecules/Toolbar'
import { CaptureListHeader } from '@/components/molecules/CaptureListHeader'
import { CaptureList } from '@/components/molecules/CaptureList'
import { EmptyState } from '@/components/molecules/EmptyState'
import type { Capture, ObservationStatus } from '@/types'

interface LiveSource {
  pageTitle: string
  url: string
  favicon?: string
}

interface BodyProps {
  status: ObservationStatus
  liveText: string
  liveSource: LiveSource | null
  captures: Capture[]
  onToggleObserving: () => void
  onAdd: () => void
  onDelete: (id: string) => void
}

export function Body({
  status,
  liveText,
  liveSource,
  captures,
  onToggleObserving,
  onAdd,
  onDelete,
}: BodyProps) {
  return (
    <section className="flex flex-1 flex-col gap-2 overflow-hidden px-4 py-[14px]">
      <SectionLabel>LIVE SELECTION</SectionLabel>
      <LivePreview text={liveText || undefined} source={liveSource ?? undefined} />
      <Toolbar
        isObserving={status === 'observing'}
        canAdd={Boolean(liveText)}
        onToggleObserving={onToggleObserving}
        onAdd={onAdd}
      />
      <Divider />
      <CaptureListHeader count={captures.length} />
      {captures.length === 0 ? (
        <EmptyState />
      ) : (
        <CaptureList captures={captures} onDelete={onDelete} />
      )}
    </section>
  )
}
