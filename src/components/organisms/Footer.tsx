import { File, FileText } from 'lucide-react'
import { FooterButton } from '@/components/molecules/FooterButton'
import type { ExportFormat } from '@/lib/export'

interface FooterProps {
  captureCount: number
  onDownload: (format: ExportFormat) => void
}

export function Footer({ captureCount, onDownload }: FooterProps) {
  const hasCaptures = captureCount > 0
  return (
    <footer className="flex h-[54px] items-center gap-2 border-t border-luma-border px-4 py-[10px]">
      <FooterButton
        icon={<FileText size={12} strokeWidth={1.5} />}
        label="Download .docx"
        variant={hasCaptures ? 'primary' : 'default'}
        disabled={!hasCaptures}
        onClick={() => onDownload('docx')}
      />
      <FooterButton
        icon={<File size={12} strokeWidth={1.5} />}
        label="Download .pdf"
        variant={hasCaptures ? 'primary' : 'default'}
        disabled={!hasCaptures}
        onClick={() => onDownload('pdf')}
      />
    </footer>
  )
}
