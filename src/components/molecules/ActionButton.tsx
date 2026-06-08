import { cn } from '@/lib/utils'

type ActionButtonVariant = 'play' | 'add'

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

const PlusIcon = () => (
  <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true">
    <path d="M5 1l0 8m-4-4l8 0" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
)

const variants = {
  play: {
    label: 'Play',
    icon: <PlayIcon />,
    className: 'border-luma-amber-400 text-luma-amber-400',
  },
  add: {
    label: 'Add capture',
    icon: <PlusIcon />,
    className: 'border-[#35354A] text-luma-gray-400',
  },
}

export function ActionButton({ variant, disabled = false, onClick }: ActionButtonProps) {
  const { label, icon, className } = variants[variant]
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex h-9 w-full items-center justify-center gap-[6px] rounded-[9px] border px-3',
        'text-[12px] font-medium transition-opacity',
        className,
        disabled && 'cursor-not-allowed opacity-40'
      )}
    >
      {icon}
      {label}
    </button>
  )
}
