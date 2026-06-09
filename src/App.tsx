import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Header } from '@/components/organisms/Header'
import { Body } from '@/components/organisms/Body'
import { Footer } from '@/components/organisms/Footer'
import { generateDocx } from '@/lib/export'
import type { Capture, Message, ObservationStatus } from '@/types'

const ext = typeof chrome !== 'undefined' && chrome.runtime?.id ? chrome : null

interface LiveSource {
  pageTitle: string
  url: string
  favicon?: string
}

export default function App() {
  const [status, setStatus] = useState<ObservationStatus>('idle')
  const [liveText, setLiveText] = useState('')
  const [liveSource, setLiveSource] = useState<LiveSource | null>(null)
  const [captures, setCaptures] = useState<Capture[]>([])

  useEffect(() => {
    if (!ext) return
    ext.storage.local.get(['isObserving'], (r: Record<string, unknown>) => {
      if (r.isObserving) setStatus('observing')
    })
    ext.storage.session.get(['captures', 'liveSelection'], (r: Record<string, unknown>) => {
      if (Array.isArray(r.captures)) setCaptures(r.captures as Capture[])
      const live = r.liveSelection as (LiveSource & { text: string }) | undefined
      if (live?.text) {
        setLiveText(live.text)
        setLiveSource({ pageTitle: live.pageTitle, url: live.url, favicon: live.favicon })
      }
    })
  }, [])

  useEffect(() => {
    if (!ext) return
    const onStorageChanged = (
      changes: Record<string, chrome.storage.StorageChange>,
      area: string
    ) => {
      if (area !== 'session' || !changes.liveSelection) return
      const live = changes.liveSelection.newValue as (LiveSource & { text: string }) | undefined
      if (live?.text) {
        setLiveText(live.text)
        setLiveSource({ pageTitle: live.pageTitle, url: live.url, favicon: live.favicon })
      } else {
        setLiveText('')
        setLiveSource(null)
      }
    }
    ext.storage.onChanged.addListener(onStorageChanged)
    return () => ext.storage.onChanged.removeListener(onStorageChanged)
  }, [])

  useEffect(() => {
    if (!ext) return
    const onMessage = (msg: Message) => {
      if (msg.type === 'SELECTION_CHANGED') {
        setLiveText(msg.text)
        setLiveSource({ pageTitle: msg.pageTitle, url: msg.url })
      }
    }
    ext.runtime.onMessage.addListener(onMessage)
    return () => ext.runtime.onMessage.removeListener(onMessage)
  }, [])

  const handleToggleObserving = async () => {
    const next: ObservationStatus = status === 'idle' ? 'observing' : 'idle'
    setStatus(next)
    if (next === 'idle') {
      setLiveText('')
      setLiveSource(null)
      ext?.storage.session.remove('liveSelection')
    } else if (ext) {
      const [tab] = await ext.tabs.query({ active: true, currentWindow: true })
      if (tab?.windowId !== undefined) {
        await ext.sidePanel.open({ windowId: tab.windowId })
      }
    }
    await ext?.storage.local.set({ isObserving: next === 'observing' })
    ext?.runtime.sendMessage({ type: 'SET_ACTIVE', active: next === 'observing' })
  }

  const handleAdd = () => {
    if (!liveText || !liveSource) return
    const capture: Capture = {
      id: crypto.randomUUID(),
      text: liveText,
      pageTitle: liveSource.pageTitle,
      url: liveSource.url,
      timestamp: Date.now(),
      favicon: liveSource.favicon,
    }
    const next = [...captures, capture]
    setCaptures(next)
    setLiveText('')
    setLiveSource(null)
    ext?.storage.session.set({ captures: next })
  }

  const handleDelete = (id: string) => {
    const next = captures.filter((c) => c.id !== id)
    setCaptures(next)
    ext?.storage.session.set({ captures: next })
  }

  const handleDownload = async () => {
    if (captures.length === 0) return
    await generateDocx(captures)
    setCaptures([])
    ext?.storage.session.set({ captures: [] })
  }

  return (
    <div
      className={cn(
        'luma-popup flex h-full flex-col',
        status === 'observing' && 'luma-observing'
      )}
    >
      <Header status={status} />
      <Body
        status={status}
        liveText={liveText}
        liveSource={liveSource}
        captures={captures}
        onToggleObserving={handleToggleObserving}
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
      <Footer
        captureCount={captures.length}
        onDownload={handleDownload}
      />
    </div>
  )
}
