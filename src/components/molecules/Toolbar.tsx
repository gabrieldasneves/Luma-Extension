import { ActionButton } from '@/components/molecules/ActionButton'

interface ToolbarProps {
  canAdd: boolean
  onPlay: () => void
  onAdd: () => void
}

export function Toolbar({ canAdd, onPlay, onAdd }: ToolbarProps) {
  return (
    <div className="flex w-full gap-2">
      <ActionButton variant="play" onClick={onPlay} />
      <ActionButton variant="add" disabled={!canAdd} onClick={onAdd} />
    </div>
  )
}
