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
    ext.storage.session.get(['captures'], (r: Record<string, unknown>) => {
      if (Array.isArray(r.captures)) setCaptures(r.captures as Capture[])
    })
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

  const handleToggleObserving = () => {
    const next: ObservationStatus = status === 'idle' ? 'observing' : 'idle'
    setStatus(next)
    if (next === 'idle') {
      setLiveText('')
      setLiveSource(null)
    }
    ext?.runtime.sendMessage({ type: 'SET_ACTIVE', active: next === 'observing' })
    ext?.storage.local.set({ isObserving: next === 'observing' })
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
        'luma-popup flex h-screen flex-col',
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
        onPreview={() => {}}
        onDownload={handleDownload}
      />
    </div>
  )
}
