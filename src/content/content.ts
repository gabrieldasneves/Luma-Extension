import type { Message } from "@/types";

const LUMA_LOADED_KEY = "__lumaContentScriptLoaded";

if (!(globalThis as Record<string, unknown>)[LUMA_LOADED_KEY]) {
  (globalThis as Record<string, unknown>)[LUMA_LOADED_KEY] = true;

  let selectionTimer: ReturnType<typeof setTimeout> | null = null;

  async function isObservingEnabled(): Promise<boolean> {
    const { isObserving } = await chrome.storage.local.get(["isObserving"]);
    return Boolean(isObserving);
  }

  function getSelectionText(): string {
    const selection = window.getSelection();
    return selection?.toString().trim() ?? "";
  }

  async function publishSelection() {
    if (!(await isObservingEnabled())) return;

    const text = getSelectionText();
    if (!text) return;

    chrome.runtime
      .sendMessage({
        type: "SELECTION_CHANGED",
        text,
        pageTitle: document.title,
        url: window.location.href,
      } satisfies Message)
      .catch(() => undefined);
  }

  function scheduleSelectionCheck() {
    if (selectionTimer) clearTimeout(selectionTimer);
    selectionTimer = setTimeout(() => {
      void publishSelection();
    }, 100);
  }

  document.addEventListener(
    "mouseup",
    () => {
      void publishSelection();
    },
    true,
  );
  document.addEventListener(
    "keyup",
    () => {
      void publishSelection();
    },
    true,
  );
  document.addEventListener("selectionchange", scheduleSelectionCheck);
}
