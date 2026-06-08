import type { Capture } from '@/types'

interface CaptureItemProps {
  capture: Capture
  onDelete: (id: string) => void
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export function CaptureItem({ capture, onDelete }: CaptureItemProps) {
  return (
    <div className="flex gap-[10px] rounded-[9px] bg-luma-slate-800 px-3 py-[10px]">
      <div className="mt-[2px] h-[38px] w-[2.5px] shrink-0 rounded-[2px] bg-luma-amber-400" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="line-clamp-3 text-[12px] text-luma-white-off">{capture.text}</p>
        <div className="flex items-center gap-[5px]">
          {capture.favicon ? (
            <img src={capture.favicon} className="h-[10px] w-[10px] shrink-0 rounded-full object-cover" alt="" />
          ) : (
            <span className="block h-[10px] w-[10px] shrink-0 rounded-full bg-luma-slate-600" />
          )}
          <span className="text-metadata truncate text-luma-gray-400">
            {extractDomain(capture.url)}
          </span>
        </div>
      </div>
      <button
        type="button"
        aria-label="Delete capture"
        onClick={() => onDelete(capture.id)}
        className="shrink-0 self-start text-[11px] text-luma-slate-600 transition-colors hover:text-destructive"
      >
        ✕
      </button>
    </div>
  )
}
