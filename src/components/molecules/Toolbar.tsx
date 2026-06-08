import { ActionButton } from '@/components/molecules/ActionButton'

interface ToolbarProps {
  isObserving: boolean
  canAdd: boolean
  onToggleObserving: () => void
  onAdd: () => void
}

export function Toolbar({ isObserving, canAdd, onToggleObserving, onAdd }: ToolbarProps) {
  return (
    <div className="flex w-full gap-2">
      <ActionButton
        variant={isObserving ? 'pause' : 'play'}
        onClick={onToggleObserving}
      />
      <ActionButton
        variant="add"
        disabled={!canAdd}
        onClick={onAdd}
      />
    </div>
  )
}
