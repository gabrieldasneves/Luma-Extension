import { Logo } from '@/components/molecules/Logo'
import { StatusBadge } from '@/components/molecules/StatusBadge'
import type { ObservationStatus } from '@/types'

interface HeaderProps {
  status: ObservationStatus
}

export function Header({ status }: HeaderProps) {
  return (
    <header className="flex h-12 items-center justify-between border-b border-[#35354A] px-4">
      <Logo />
      <StatusBadge status={status} />
    </header>
  )
}
