import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FooterButtonProps {
  icon: ReactNode
  label: string
  disabled?: boolean
  onClick?: () => void
}

export function FooterButton({ icon, label, disabled = false, onClick }: FooterButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex h-[34px] w-full items-center justify-center gap-[6px] rounded-[8px]',
        'bg-luma-slate-800 text-[12px] font-medium text-luma-slate-600',
        'transition-opacity',
        disabled ? 'cursor-not-allowed opacity-50' : 'opacity-100'
      )}
    >
      {icon}
      {label}
    </button>
  )
}
