import type { Message } from '@/types'

function enableSidePanel () {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(console.error)
}

function enableSessionStorageForContentScripts () {
  chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' }).catch(console.error)
}

function init () {
  enableSidePanel()
  enableSessionStorageForContentScripts()
}

init()
chrome.runtime.onStartup.addListener(init)
chrome.runtime.onInstalled.addListener(init)

function getContentScriptFiles (): string[] {
  const manifest = chrome.runtime.getManifest() as chrome.runtime.ManifestV3
  return manifest.content_scripts?.flatMap((entry) => entry.js ?? []) ?? []
}

function isInjectableUrl (url?: string): boolean {
  if (!url) return false
  return url.startsWith('http://') || url.startsWith('https://')
}

async function injectContentScript (tabId: number) {
  const files = getContentScriptFiles()
  if (files.length === 0) return

  try {
    await chrome.scripting.executeScript({ target: { tabId }, files })
  } catch {
    // restricted pages (chrome://, Web Store, etc.)
  }
}

async function injectIntoAllTabs () {
  const tabs = await chrome.tabs.query({})
  for (const tab of tabs) {
    if (tab.id !== undefined && isInjectableUrl(tab.url)) {
      await injectContentScript(tab.id)
    }
  }
}

function broadcastActive (active: boolean) {
  chrome.tabs.query({}, (tabs) => {
    for (const tab of tabs) {
      if (tab.id === undefined) continue
      chrome.tabs.sendMessage(tab.id, { type: 'SET_ACTIVE', active } satisfies Message).catch(() => {})
    }
  })
}

function syncObservingTab (tabId: number) {
  chrome.storage.local.get(['isObserving'], (result) => {
    if (result.isObserving) void injectContentScript(tabId)
  })
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && isInjectableUrl(tab.url)) {
    syncObservingTab(tabId)
  }
})

chrome.tabs.onActivated.addListener(({ tabId }) => {
  syncObservingTab(tabId)
})

chrome.runtime.onMessage.addListener((msg: Message) => {
  if (msg.type === 'SET_ACTIVE') {
    chrome.storage.local.set({ isObserving: msg.active })
    if (msg.active) void injectIntoAllTabs()
    broadcastActive(msg.active)
    return
  }

  if (msg.type === 'SELECTION_CHANGED') {
    chrome.storage.session.set({
      liveSelection: {
        text: msg.text,
        pageTitle: msg.pageTitle,
        url: msg.url,
      },
    })
  }
})

chrome.storage.local.get(['isObserving'], (result) => {
  if (result.isObserving) {
    void injectIntoAllTabs()
    broadcastActive(true)
  }
})
