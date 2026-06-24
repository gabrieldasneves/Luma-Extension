import { cn } from '@/lib/utils'

export type ActionButtonVariant = 'play' | 'pause' | 'add'

interface ActionButtonProps {
  variant: ActionButtonVariant
  disabled?: boolean
  onClick?: () => void
}

const PlayIcon = () => (
  <svg viewBox="0 0 9 10" width="9" height="10" aria-hidden="true">
    <path d="M0 0l9 5-9 5z" fill="currentColor" />
  </svg>
)

const PauseIcon = () => (
  <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true">
    <path d="M1 0l2 0 0 10-2 0z m6 0l2 0 0 10-2 0z" fill="currentColor" />
  </svg>
)

const PlusIcon = () => (
  <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true">
    <path d="M5 1l0 8m-4-4l8 0" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
)

const config: Record<
  ActionButtonVariant,
  { label: string; icon: React.ReactNode; base: string; active: string }
> = {
  play: {
    label: 'Play',
    icon: <PlayIcon />,
    base: 'border border-luma-mint text-luma-mint',
    active: 'border border-luma-mint text-luma-mint',
  },
  pause: {
    label: 'Pause',
    icon: <PauseIcon />,
    base: 'bg-luma-mint text-luma-navy',
    active: 'bg-luma-mint text-luma-navy',
  },
  add: {
    label: 'Add capture',
    icon: <PlusIcon />,
    base: 'border border-luma-border text-luma-gray-400',
    active: 'border border-luma-blue text-luma-blue',
  },
}

export function ActionButton({ variant, disabled = false, onClick }: ActionButtonProps) {
  const { label, icon, base, active } = config[variant]
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex h-9 w-full items-center justify-center gap-[6px] rounded-[9px] px-3',
        'text-[12px] font-medium transition-opacity',
        disabled ? `${base} cursor-not-allowed opacity-40` : active
      )}
    >
      {icon}
      {label}
    </button>
  )
}
