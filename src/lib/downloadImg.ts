function downloadBlob (blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

function inferExtension (src: string): string {
  if (src.startsWith('data:image/')) {
    return src.match(/^data:image\/(\w+)/)?.[1]?.toLowerCase() ?? 'png'
  }
  try {
    const pathname = new URL(src).pathname
    const match = pathname.match(/\.(jpe?g|png|gif|webp|svg|avif|bmp)$/i)
    return match?.[1]?.toLowerCase() ?? 'png'
  } catch {
    return 'png'
  }
}

export function imageFilename (src: string, alt: string): string {
  const slug = alt
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 50)
  const base = slug || 'luma-image'
  return `${base}-${Date.now()}.${inferExtension(src)}`
}

export async function downloadImage (url: string, filename: string) {
  if (url.startsWith('data:') || url.startsWith('blob:')) {
    const response = await fetch(url)
    const blob = await response.blob()
    downloadBlob(blob, filename)
    return
  }

  await chrome.downloads.download({ url, filename, saveAs: false })
}
