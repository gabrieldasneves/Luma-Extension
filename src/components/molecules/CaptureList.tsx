import { CaptureItem } from '@/components/molecules/CaptureItem'
import type { Capture } from '@/types'

interface CaptureListProps {
  captures: Capture[]
  onDelete: (id: string) => void
}

export function CaptureList({ captures, onDelete }: CaptureListProps) {
  return (
    <div className="flex flex-col gap-[6px] overflow-y-auto">
      {captures.map((capture) => (
        <CaptureItem key={capture.id} capture={capture} onDelete={onDelete} />
      ))}
    </div>
  )
}
