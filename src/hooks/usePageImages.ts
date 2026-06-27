import { useCallback, useEffect, useState } from 'react'
import type { Message, PageImage } from '@/types'

const ext = typeof chrome !== 'undefined' && chrome.runtime?.id ? chrome : null

interface PageSource {
  pageTitle: string
  url: string
}

function isInjectableUrl (url?: string): boolean {
  if (!url) return false
  return url.startsWith('http://') || url.startsWith('https://')
}

function getContentScriptFiles (): string[] {
  if (!ext) return []
  const manifest = ext.runtime.getManifest() as chrome.runtime.ManifestV3
  return manifest.content_scripts?.flatMap((entry) => entry.js ?? []) ?? []
}

async function injectContentScript (tabId: number) {
  const files = getContentScriptFiles()
  if (files.length === 0) return
  await ext!.scripting.executeScript({ target: { tabId }, files })
}

export function usePageImages (enabled: boolean) {
  const [images, setImages] = useState<PageImage[]>([])
  const [pageSource, setPageSource] = useState<PageSource | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchImages = useCallback(async () => {
    if (!ext) return

    setIsLoading(true)
    setError(null)

    try {
      const [tab] = await ext.tabs.query({ active: true, currentWindow: true })

      if (!tab?.id || !isInjectableUrl(tab.url)) {
        setImages([])
        setPageSource(null)
        setError('This page cannot be scanned. Open a regular website.')
        return
      }

      let response: Message | undefined

      try {
        response = await ext.tabs.sendMessage(tab.id, { type: 'GET_PAGE_IMAGES' } satisfies Message)
      } catch {
        await injectContentScript(tab.id)
        response = await ext.tabs.sendMessage(tab.id, { type: 'GET_PAGE_IMAGES' } satisfies Message)
      }

      if (response?.type === 'PAGE_IMAGES') {
        setImages(response.images)
        setPageSource({ pageTitle: response.pageTitle, url: response.url })
        return
      }

      setImages([])
      setPageSource(null)
      setError('Could not read images from this page. Try reloading it.')
    } catch {
      setImages([])
      setPageSource(null)
      setError('Could not read images from this page. Try reloading it.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!enabled || !ext) return

    void fetchImages()

    const onTabActivated = () => {
      void fetchImages()
    }

    const onTabUpdated = (
      _tabId: number,
      changeInfo: chrome.tabs.OnUpdatedInfo
    ) => {
      if (changeInfo.status === 'complete') void fetchImages()
    }

    ext.tabs.onActivated.addListener(onTabActivated)
    ext.tabs.onUpdated.addListener(onTabUpdated)

    return () => {
      ext.tabs.onActivated.removeListener(onTabActivated)
      ext.tabs.onUpdated.removeListener(onTabUpdated)
    }
  }, [enabled, fetchImages])

  return { images, pageSource, isLoading, error, fetchImages }
}
