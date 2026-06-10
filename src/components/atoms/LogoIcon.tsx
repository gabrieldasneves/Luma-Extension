function getLogoSrc () {
  if (typeof chrome !== 'undefined' && chrome.runtime?.getURL) {
    return chrome.runtime.getURL('logo.png')
  }
  return '/logo.png'
}

export function LogoIcon() {
  return (
    <img
      src={getLogoSrc()}
      alt=""
      width={40}
      height={40}
      className="h-[40px] w-[40px] shrink-0"
      aria-hidden="true"
    />
  )
}
