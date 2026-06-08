import { cn } from '@/lib/utils'

interface LivePreviewSource {
  pageTitle: string
  url: string
  favicon?: string
}

interface LivePreviewProps {
  text?: string
  source?: LivePreviewSource
}

function shortenUrl(url: string): string {
  try {
    const { hostname, pathname } = new URL(url)
    const path = pathname.split('/').filter(Boolean)[0]
    const short = path ? `${hostname}/${path}...` : hostname
    return short.length > 32 ? short.slice(0, 32) + '...' : short
  } catch {
    return url
  }
}

export function LivePreview({ text, source }: LivePreviewProps) {
  const hasText = Boolean(text)
  return (
    <div
      className={cn(
        'luma-live-preview overflow-hidden',
        hasText ? 'luma-live-preview-active flex flex-col gap-[6px] p-[10px_12px]' : 'flex h-20 items-center justify-center'
      )}
    >
      {hasText ? (
        <>
          <p className="line-clamp-5 text-[12px] text-luma-white-off">{text}</p>
          {source && (
            <div className="flex items-center gap-[6px]">
              {source.favicon ? (
                <img src={source.favicon} className="h-3 w-3 rounded-full object-cover" alt="" />
              ) : (
                <span className="block h-3 w-3 shrink-0 rounded-full bg-luma-slate-600" />
              )}
              <span className="text-metadata text-luma-gray-400 truncate">{source.pageTitle}</span>
              <span className="text-metadata text-luma-amber-400 shrink-0">{shortenUrl(source.url)}</span>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-[12px] italic text-luma-slate-600">
          Start browsing and select text to capture...
        </p>
      )}
    </div>
  )
}
