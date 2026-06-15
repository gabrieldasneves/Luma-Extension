import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type FooterButtonVariant = 'default' | 'primary'

interface FooterButtonProps {
  icon: ReactNode
  label: string
  variant?: FooterButtonVariant
  disabled?: boolean
  onClick?: () => void
}

export function FooterButton({
  icon,
  label,
  variant = 'default',
  disabled = false,
  onClick,
}: FooterButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex h-[34px] w-full items-center justify-center gap-[6px] rounded-[8px] px-3',
        'text-[12px] transition-opacity',
        variant === 'primary'
          ? 'bg-luma-mint font-semibold text-luma-navy'
          : 'bg-luma-surface font-medium text-luma-charcoal',
        disabled && 'cursor-not-allowed opacity-50'
      )}
    >
      {icon}
      {label}
    </button>
  )
}
