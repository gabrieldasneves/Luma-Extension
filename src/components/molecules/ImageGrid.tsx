import { ImageCard } from '@/components/molecules/ImageCard'
import type { PageImage } from '@/types'

interface ImageGridProps {
  images: PageImage[]
}

export function ImageGrid ({ images }: ImageGridProps) {
  return (
    <div className="grid grid-cols-2 content-start gap-[6px] pb-2 auto-rows-max">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  )
}
