const HighlightGlyph = () => (
  <svg viewBox="0 0 18 18" width="20" height="20" aria-hidden="true" className="text-luma-gray-400">
    <path d="M10 1l7 6-10 10-6 0 0-6z" fill="currentColor" />
  </svg>
)

export function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-[10px]">
      <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-luma-mint opacity-15">
        <HighlightGlyph />
      </div>
      <p className="w-[220px] text-center text-[12px] text-luma-charcoal">
        No captures yet.
        <br />
        Press Play to start observing.
      </p>
    </div>
  )
}
