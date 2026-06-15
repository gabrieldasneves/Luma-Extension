import { LogoIcon } from '@/components/atoms/LogoIcon'

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <LogoIcon />
      <span className="text-[15px] font-semibold text-luma-white-off">Luma</span>
    </div>
  )
}
