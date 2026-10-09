import { useEffect, useRef, type ReactNode } from 'react'
import { TERM_INFO } from '@/lib/solarTerms'
import { YIJI_PLAIN } from '@/lib/almanac'

// ---------------- 滚动淡入容器 ----------------
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => el.classList.add('is-visible'), delay)
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

// ---------------- 印章 Logo ----------------
export function Seal({ size = 40, text = '玄枢' }: { size?: number; text?: string }) {
  const id = useRef(`seal-${Math.random().toString(36).slice(2, 8)}`).current
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-label="玄枢印章">
      <defs>
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.4" />
        </filter>
      </defs>
      <rect x="3" y="3" width="42" height="42" rx="5" fill="#A63A2B" filter={`url(#${id})`} />
      <rect x="6.5" y="6.5" width="35" height="35" rx="3" fill="none" stroke="#E8E0CF" strokeWidth="1" opacity="0.55" />
      <text
        x="24"
        y="24"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#E8E0CF"
        fontSize={text.length > 1 ? 15 : 22}
        fontFamily="'Songti SC','Noto Serif SC',serif"
        fontWeight="700"
        style={{ writingMode: text.length > 1 ? 'vertical-rl' : undefined, letterSpacing: 2 }}
      >
        {text}
      </text>
    </svg>
  )
}

// ---------------- 卦画 ----------------
export function GuaPaint({
  lines,
  width = 64,
  gap,
  color = '#C9A35C',
  className = '',
}: {
  lines: number[] // 自下而上，1 阳 0 阴
  width?: number
  gap?: number
  color?: string
  className?: string
}) {
  const g = gap ?? Math.max(3, width / 12)
  const h = Math.max(2, width / 14)
  const height = lines.length * h + (lines.length - 1) * g
  // SVG 自上而下画，所以要倒序渲染（上爻在最上）
  const topDown = [...lines].reverse()
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} aria-label="卦画">
      {topDown.map((yang, i) => {
        const y = i * (h + g)
        return yang ? (
          <rect key={i} x="0" y={y} width={width} height={h} rx={h / 3} fill={color} />
        ) : (
          <g key={i}>
            <rect x="0" y={y} width={width * 0.42} height={h} rx={h / 3} fill={color} />
            <rect x={width * 0.58} y={y} width={width * 0.42} height={h} rx={h / 3} fill={color} />
          </g>
        )
      })}
    </svg>
  )
}

// ---------------- 宜 / 忌 标签块 ----------------
export function YiJiBlock({ kind, items }: { kind: '宜' | '忌'; items: string[] }) {
  const isYi = kind === '宜'
  return (
    <div className="gold-card rounded-sm p-5 md:p-6">
      <div className="flex items-start gap-4">
        <span
          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm text-lg font-bold ${
            isYi ? 'bg-gold text-ink' : 'bg-vermilion text-rice'
          }`}
          style={{ fontFamily: "'Songti SC','Noto Serif SC',serif" }}
        >
          {kind}
        </span>
        <div className="flex flex-wrap gap-x-5 gap-y-3 pt-0.5">
          {items.map((it) => (
            <span key={it} className="inline-flex flex-col">
              <span className="text-[15px] tracking-wider text-rice/90">{it}</span>
              {YIJI_PLAIN[it] && (
                <span className="mt-0.5 text-[11px] tracking-wider text-dim/80">{YIJI_PLAIN[it]}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---------------- 十二时辰条带 ----------------
export function HourStrip({ hours }: { hours: { zhi: string; timeRange: string; god: string; isAuspicious: boolean }[] }) {
  return (
    <div className="grid grid-cols-6 gap-px overflow-hidden rounded-sm border border-gold/15 md:grid-cols-12">
      {hours.map((h) => (
        <div
          key={h.zhi}
          className={`flex flex-col items-center gap-1 px-1 py-3 text-center transition-colors ${
            h.isAuspicious ? 'bg-gold/12 hover:bg-gold/20' : 'bg-black/25 hover:bg-black/35'
          }`}
        >
          <span className={`text-base font-semibold ${h.isAuspicious ? 'text-gold' : 'text-dim'}`}>{h.zhi}</span>
          <span className={`text-[10px] leading-tight ${h.isAuspicious ? 'text-rice/70' : 'text-dim/70'}`}>{h.timeRange}</span>
          <span className={`text-[11px] ${h.isAuspicious ? 'text-gold/90' : 'text-dim/80'}`}>{h.god}</span>
          <span
            className={`mt-0.5 rounded-[2px] px-1.5 text-[10px] tracking-widest ${
              h.isAuspicious ? 'bg-gold/20 text-gold' : 'bg-white/5 text-dim/60'
            }`}
          >
            {h.isAuspicious ? '吉' : '凶'}
          </span>
        </div>
      ))}
    </div>
  )
}

// ---------------- 黄道公转示意图 ----------------
export function EclipticRing({ longitude, size = 340, compact = false }: { longitude: number; size?: number; compact?: boolean }) {
  const cx = 200
  const cy = 200
  const rOuter = 168
  const rInner = 150
  const rOrbit = 130
  // 黄经 → SVG 角度：春分(0°)在正右方，逆时针递增（地球公转方向）
  const toXY = (lon: number, r: number) => {
    const a = (-lon * Math.PI) / 180
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const
  }
  const [ex, ey] = toXY(longitude, rOrbit)

  return (
    <svg viewBox="0 0 400 400" width={size} height={size} className="mx-auto" role="img" aria-label="黄道二十四节气图">
      <defs>
        <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8C876" />
          <stop offset="55%" stopColor="#C9A35C" />
          <stop offset="100%" stopColor="#C9A35C" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 外环 */}
      <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke="#C9A35C" strokeOpacity="0.35" strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r={rInner} fill="none" stroke="#C9A35C" strokeOpacity="0.18" strokeWidth="0.6" />
      {/* 公转轨道 */}
      <circle cx={cx} cy={cy} r={rOrbit} fill="none" stroke="#C9A35C" strokeOpacity="0.25" strokeWidth="0.7" strokeDasharray="2 4" />

      {/* 24 节气刻度 */}
      {TERM_INFO.map((t) => {
        const [x1, y1] = toXY(t.longitude, rInner)
        const [x2, y2] = toXY(t.longitude, rOuter)
        const major = t.longitude % 90 === 0
        const isCurrent = Math.abs(((longitude - t.longitude + 540) % 360) - 180) > 172.5
        return (
          <g key={t.name}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C9A35C" strokeOpacity={major ? 0.7 : 0.35} strokeWidth={major ? 1.4 : 0.7} />
            {!compact && <TermLabel lon={t.longitude} name={t.name} active={isCurrent} />}
          </g>
        )
      })}

      {/* 太阳 */}
      <circle cx={cx} cy={cy} r="34" fill="url(#sunGrad)" opacity="0.5" />
      <circle cx={cx} cy={cy} r="14" fill="#E8C876" />
      <circle cx={cx} cy={cy} r="14" fill="none" stroke="#C9A35C" strokeOpacity="0.6" strokeWidth="0.8" />

      {/* 地球 */}
      <g>
        <circle cx={ex} cy={ey} r="7" fill="#7A9B6D" stroke="#E8E0CF" strokeOpacity="0.7" strokeWidth="0.8" />
        <circle cx={ex} cy={ey} r="11" fill="none" stroke="#C9A35C" strokeOpacity="0.5" strokeWidth="0.7">
          <animate attributeName="r" values="9;13;9" dur="3s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.6;0.1;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  )

  function TermLabel({ lon, name, active }: { lon: number; name: string; active: boolean }) {
    const r = 184
    const [x, y] = toXY(lon, r)
    const major = lon % 90 === 0
    return (
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={major ? 13 : 10.5}
        fill={active ? '#E8C876' : major ? '#C9A35C' : '#8A7F68'}
        fontFamily="'Songti SC','Noto Serif SC',serif"
        fontWeight={active || major ? 600 : 400}
      >
        {name}
      </text>
    )
  }
}

// ---------------- 节标题（壹·今日黄历 式） ----------------
export function SectionHeading({ num, title, sub }: { num: string; title: string; sub?: string }) {
  return (
    <div className="mb-10 flex items-end gap-5">
      <span className="vertical-rl hidden select-none text-sm tracking-[0.4em] text-dim/60 sm:block">{num}</span>
      <div className="flex-1">
        <div className="flex items-baseline gap-4">
          <h2 className="text-3xl font-bold tracking-wider text-rice md:text-4xl">
            <span className="mr-3 text-gold">{num}</span>
            {title}
          </h2>
          {sub && <span className="hidden text-sm tracking-widest text-dim md:inline">{sub}</span>}
        </div>
        <div className="mt-4 h-px w-full bg-gradient-to-r from-gold/50 via-gold/15 to-transparent" />
      </div>
    </div>
  )
}
