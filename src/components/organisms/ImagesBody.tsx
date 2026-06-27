import { RefreshCw } from 'lucide-react'
import { SectionLabel } from '@/components/atoms/SectionLabel'
import { ImageGrid } from '@/components/molecules/ImageGrid'
import { ImagesEmptyState } from '@/components/molecules/ImagesEmptyState'
import { usePageImages } from '@/hooks/usePageImages'

function extractDomain (url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export function ImagesBody () {
  const { images, pageSource, isLoading, error, fetchImages } = usePageImages(true)

  return (
    <section className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden px-4 py-[14px]">
      <div className="flex items-center justify-between">
        <SectionLabel>PAGE IMAGES</SectionLabel>
        <button
          type="button"
          onClick={() => void fetchImages()}
          disabled={isLoading}
          aria-label="Refresh images"
          className="flex items-center gap-1 text-[11px] text-luma-gray-400 transition-colors hover:text-luma-white-off disabled:opacity-50"
        >
          <RefreshCw size={12} strokeWidth={1.5} className={isLoading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {pageSource && (
        <p className="truncate text-metadata text-luma-gray-400">
          {extractDomain(pageSource.url)}
          {images.length > 0 && ` · ${images.length} image${images.length === 1 ? '' : 's'}`}
        </p>
      )}

      {isLoading && images.length === 0 ? (
        <ImagesEmptyState message="Scanning page for images…" />
      ) : error ? (
        <ImagesEmptyState message={error} />
      ) : images.length === 0 ? (
        <ImagesEmptyState message="No images found on this page." />
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <ImageGrid images={images} />
        </div>
      )}
    </section>
  )
}
