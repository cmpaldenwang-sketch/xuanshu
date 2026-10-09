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
  // dayOffset：0 = 今日，1 = 预习明日，负数 = 复习往日（最早回到建站锚点 2026-10-07）
  const [dayOffset, setDayOffset] = useState(0)
  const base = useMemo(() => getViewDate(), [])
  const date = useMemo(() => {
    return new Date(base.getFullYear(), base.getMonth(), base.getDate() + dayOffset, 12, 0, 0)
  }, [base, dayOffset])
  const diff = diffDays(date)

  // 边界：锚点日 diff=0（再早没有内容），最晚 +1（预习明日）
  const minOffset = -diffDays(base)
  const maxOffset = 1
  const gotoOffset = (o: number) => {
    setDayOffset(Math.min(maxOffset, Math.max(minOffset, o)))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const almanac = getAlmanac(date)
  const term = getCurrentTerm(date)
  const hex = HEXAGRAMS[mod(diff, 64)]
  const lesson = FS_LESSONS[mod(diff, 24)]
  const stem = STEM_ROTATION[mod(diff, 10)]

  const dayLabel = dayOffset === 0 ? '今日' : dayOffset === 1 ? '明日' : '当日'

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero
          date={date}
          almanac={almanac}
          term={term}
          dayOffset={dayOffset}
          minOffset={minOffset}
          maxOffset={maxOffset}
          onGotoOffset={gotoOffset}
        />
        <AlmanacSection almanac={almanac} dayLabel={dayLabel} />
        <SolarTermSection term={term} />
        <FengshuiSection lesson={lesson} dayLabel={dayLabel} />
        <HexagramSection hex={hex} dayLabel={dayLabel} />
        <BaziSection todayStem={stem} dayLabel={dayLabel} />
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
