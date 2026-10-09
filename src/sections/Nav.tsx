import { Seal } from '@/components/decor'

const LINKS = [
  { href: '#almanac', label: '黄历' },
  { href: '#solar-term', label: '节气' },
  { href: '#fengshui', label: '风水' },
  { href: '#hexagram', label: '周易' },
  { href: '#bazi', label: '八字' },
]

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/20 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-8">
        <a href="#top" className="flex items-center gap-3">
          <Seal size={30} />
          <span className="text-lg font-bold tracking-[0.35em] text-rice">玄枢</span>
          <span className="hidden text-[11px] tracking-[0.25em] text-dim sm:inline">观天之道 · 执天之行</span>
        </a>
        <nav className="flex items-center gap-5 md:gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm tracking-[0.3em] text-dim transition-colors duration-300 hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
