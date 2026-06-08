import { Clock, Download } from 'lucide-react'
import { FooterButton } from '@/components/molecules/FooterButton'

interface FooterProps {
  captureCount: number
  onPreview: () => void
  onDownload: () => void
}

export function Footer({ captureCount, onPreview, onDownload }: FooterProps) {
  const hasCaptures = captureCount > 0
  return (
    <footer className="flex h-[54px] items-center gap-2 border-t border-[#35354A] px-4 py-[10px]">
      <FooterButton
        icon={<Clock size={12} strokeWidth={1.5} />}
        label="Preview"
        disabled={!hasCaptures}
        onClick={onPreview}
      />
      <FooterButton
        icon={<Download size={12} strokeWidth={1.5} />}
        label="Download .docx"
        variant={hasCaptures ? 'primary' : 'default'}
        disabled={!hasCaptures}
        onClick={onDownload}
      />
    </footer>
  )
}
