import { Logo } from '@/components/molecules/Logo'
import { StatusBadge } from '@/components/molecules/StatusBadge'
import { ThemeToggle } from '@/components/molecules/ThemeToggle'
import type { ObservationStatus } from '@/types'

interface HeaderProps {
  status: ObservationStatus
}

export function Header({ status }: HeaderProps) {
  return (
    <header className="flex h-12 items-center justify-between border-b border-luma-border px-4">
      <Logo />
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <StatusBadge status={status} />
      </div>
    </header>
  )
}
