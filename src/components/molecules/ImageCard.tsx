import { useState } from 'react'
import { Download } from 'lucide-react'
import { downloadImage, imageFilename } from '@/lib/downloadImg'
import type { PageImage } from '@/types'

interface ImageCardProps {
  image: PageImage
}

export function ImageCard ({ image }: ImageCardProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  async function handleDownload () {
    if (isDownloading) return
    setIsDownloading(true)
    try {
      await downloadImage(image.src, imageFilename(image.src, image.alt))
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={() => void handleDownload()}
      disabled={isDownloading}
      className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-[9px] bg-luma-surface disabled:cursor-wait"
      aria-label={image.alt ? `Download ${image.alt}` : 'Download image'}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 group-disabled:opacity-100">
        <Download size={18} strokeWidth={1.5} className="text-luma-mint" />
        <span className="text-[11px] text-white">
          {isDownloading ? 'Downloading…' : 'Download'}
        </span>
      </div>
    </button>
  )
}
