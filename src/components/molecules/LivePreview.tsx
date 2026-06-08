import { cn } from '@/lib/utils'

interface LivePreviewProps {
  text?: string
}

export function LivePreview({ text }: LivePreviewProps) {
  const hasText = Boolean(text)
  return (
    <div
      className={cn(
        'luma-live-preview flex h-20 items-center justify-center overflow-hidden',
        hasText && 'luma-live-preview-active items-start'
      )}
    >
      {hasText ? (
        <p className="line-clamp-5 text-[12px] text-luma-white-off">{text}</p>
      ) : (
        <p className="text-center text-[12px] italic text-luma-slate-600">
          Start browsing and select text to capture...
        </p>
      )}
    </div>
  )
}
