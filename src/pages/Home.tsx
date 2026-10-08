import { useMemo, useState } from 'react'
import Nav from '@/sections/Nav'
import Hero from '@/sections/Hero'
import AlmanacSection from '@/sections/AlmanacSection'
import SolarTermSection from '@/sections/SolarTermSection'
import FengshuiSection from '@/sections/FengshuiSection'
import HexagramSection from '@/sections/HexagramSection'
import BaziSection from '@/sections/BaziSection'
import { Seal } from '@/components/decor'
import { getAlmanac } from '@/lib/almanac'
import { getCurrentTerm } from '@/lib/solarTerms'
import { HEXAGRAMS } from '@/lib/hexagrams'
import { FS_LESSONS } from '@/lib/fengshui'
import { STEM_ROTATION } from '@/lib/stems'
import { diffDays, getViewDate, mod } from '@/lib/siteDate'

export default function Home() {
  // dayOffset：0 = 今日，1 = 预习明日（晚上看第二天的日课）
  const [dayOffset, setDayOffset] = useState(0)
  const date = useMemo(() => {
    const base = getViewDate()
    return new Date(base.getFullYear(), base.getMonth(), base.getDate() + dayOffset, 12, 0, 0)
  }, [dayOffset])
  const diff = diffDays(date)

  const almanac = getAlmanac(date)
  const term = getCurrentTerm(date)
  const hex = HEXAGRAMS[mod(diff, 64)]
  const lesson = FS_LESSONS[mod(diff, 24)]
  const stem = STEM_ROTATION[mod(diff, 10)]

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero
          date={date}
          almanac={almanac}
          term={term}
          isTomorrow={dayOffset === 1}
          onToggleDay={() => {
            setDayOffset((o) => (o === 0 ? 1 : 0))
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
        <AlmanacSection almanac={almanac} dayLabel={dayOffset === 1 ? '明日' : '今日'} />
        <SolarTermSection term={term} />
        <FengshuiSection lesson={lesson} dayLabel={dayOffset === 1 ? '明日' : '今日'} />
        <HexagramSection hex={hex} />
        <BaziSection todayStem={stem} dayLabel={dayOffset === 1 ? '明日' : '今日'} />
      </main>
      <footer className="border-t border-gold/15 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center">
          <Seal size={36} />
          <p className="text-sm tracking-[0.5em] text-rice">玄 枢</p>
          <p className="text-xs tracking-[0.3em] text-dim">观天之道 · 执天之行</p>
          <p className="mt-2 max-w-md text-[11px] leading-5 tracking-wider text-dim/60">
            本站内容源于传统历法与典籍，仅供修习传统文化参考。命由己造，相由心生，福自我求。
          </p>
        </div>
      </footer>
    </div>
  )
}
