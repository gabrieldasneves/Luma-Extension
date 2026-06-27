import { ImageIcon } from 'lucide-react'

interface ImagesEmptyStateProps {
  message: string
}

export function ImagesEmptyState ({ message }: ImagesEmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-[10px]">
      <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-luma-mint opacity-15">
        <ImageIcon size={20} strokeWidth={1.5} className="text-luma-gray-400" />
      </div>
      <p className="w-[220px] text-center text-[12px] text-luma-charcoal">{message}</p>
    </div>
  )
}
