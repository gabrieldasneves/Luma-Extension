import { cn } from '@/lib/utils'
import { Logo } from '@/components/molecules/Logo'
import { StatusBadge } from '@/components/molecules/StatusBadge'
import { ThemeToggle } from '@/components/molecules/ThemeToggle'
import type { AppView, ObservationStatus } from '@/types'

interface HeaderProps {
  status: ObservationStatus
  activeView: AppView
  onViewChange: (view: AppView) => void
}

const tabs: { id: AppView; label: string }[] = [
  { id: 'captures', label: 'Captures' },
  { id: 'images', label: 'Images' },
]

export function Header ({ status, activeView, onViewChange }: HeaderProps) {
  return (
    <header className="border-b border-luma-border">
      <div className="flex h-12 items-center justify-between px-4">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <StatusBadge status={status} />
        </div>
      </div>
      <nav className="flex gap-1 px-4 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onViewChange(tab.id)}
            className={cn(
              'rounded-[6px] px-3 py-1 text-[12px] font-medium transition-colors',
              activeView === tab.id
                ? 'bg-luma-mint/15 text-luma-white-off'
                : 'text-luma-gray-400 hover:text-luma-white-off'
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
