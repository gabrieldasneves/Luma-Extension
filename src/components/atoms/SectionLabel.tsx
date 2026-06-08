import type { ReactNode } from 'react'

interface SectionLabelProps {
  children: ReactNode
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <span className="text-metadata font-semibold tracking-wide text-luma-slate-600">
      {children}
    </span>
  )
}
