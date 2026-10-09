import type { Almanac } from '@/lib/almanac'
import { dailyVerdict } from '@/lib/almanac'
import { EclipticRing, Seal } from '@/components/decor'
import { GlossaryTerm } from '@/components/GlossaryTerm'
import type { CurrentTermState } from '@/lib/solarTerms'
import { dayNumber } from '@/lib/siteDate'

function fmtInput(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

export default function Hero({
  date,
  almanac,
  term,
  dayOffset,
  minOffset,
  maxOffset,
  onGotoOffset,
}: {
  date: Date
  almanac: Almanac
  term: CurrentTermState
  dayOffset: number
  minOffset: number
  maxOffset: number
  onGotoOffset: (offset: number) => void
}) {
  const { solar, lunar } = almanac
  const isTomorrow = dayOffset === 1
  const isReview = dayOffset < 0
  const reviewLabel =
    dayOffset === -1 ? '复习 · 昨日' : dayOffset === -2 ? '复习 · 前日' : `复习 · ${solar.month}月${solar.day}日`

  const shiftDate = (days: number) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate() + days, 12, 0, 0)
  const minDate = shiftDate(minOffset - dayOffset)
  const maxDate = shiftDate(maxOffset - dayOffset)

  const onPickDate = (raw: string) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw)
    if (!m) return
    const picked = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12, 0, 0)
    if (Number.isNaN(picked.getTime())) return
    const base = shiftDate(-dayOffset)
    onGotoOffset(Math.round((picked.getTime() - base.getTime()) / 86400000))
  }

  const navBtn =
    'inline-flex items-center gap-1 border border-gold/40 px-4 py-2 text-xs tracking-[0.25em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10 disabled:cursor-not-allowed disabled:border-gold/15 disabled:text-dim/50 disabled:hover:bg-transparent'

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 md:pt-40">
      {/* 背景太极纹理 */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] opacity-[0.08]"
        aria-hidden
      >
        <svg viewBox="0 0 200 200" className="h-full w-full animate-[spin_120s_linear_infinite]">
          <circle cx="100" cy="100" r="98" fill="none" stroke="#A8823F" strokeWidth="1" />
          <path d="M100 2 a98 98 0 0 1 0 196 a49 49 0 0 1 0-98 a49 49 0 0 0 0-98z" fill="#A8823F" />
          <circle cx="100" cy="51" r="10" fill="#A8823F" />
          <circle cx="100" cy="149" r="10" fill="#F7F3EA" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            {/* 竖排装饰 */}
            <div className="mb-8 flex items-center gap-4">
              <Seal size={44} />
              <div className="h-10 w-px bg-gold/30" />
              <p className="text-sm tracking-[0.4em] text-dim">
                {almanac.yearGz}年 · 每日修习 · 第 {dayNumber(date)} 日
              </p>
              {isTomorrow && (
                <span className="border border-vermilion/60 bg-vermilion/10 px-3 py-1 text-xs tracking-[0.35em] text-vermilion">
                  明日预习
                </span>
              )}
              {isReview && (
                <span className="border border-gold/50 bg-gold/10 px-3 py-1 text-xs tracking-[0.35em] text-gold">
                  {reviewLabel}
                </span>
              )}
            </div>

            <h1 className="font-serif leading-none">
              <span className="block text-[18vw] font-black tracking-tight text-rice sm:text-7xl md:text-8xl lg:text-[7.5rem]">
                {solar.month}
                <span className="mx-2 text-gold">月</span>
                {solar.day}
                <span className="mx-2 text-gold">日</span>
              </span>
            </h1>

            <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <span className="text-2xl font-semibold tracking-widest text-gold md:text-3xl">
                农历{lunar.monthCn}
                {lunar.dayCn}
              </span>
              <span className="text-base tracking-[0.3em] text-rice/80">星期{solar.week}</span>
            </div>

            <p className="mt-5 text-lg tracking-[0.2em] text-rice/90 md:text-xl">
              {almanac.yearGz}年 <span className="text-gold">·</span> {almanac.monthGz}月{' '}
              <span className="text-gold">·</span> {almanac.dayGz}日
            </p>

            <p className="mt-6 inline-block border border-gold/30 bg-gold/5 px-5 py-2.5 text-base tracking-[0.25em] text-gold">
              {dailyVerdict(almanac)}
            </p>

            {/* 日期导航：前一日 / 后一日 / 任意跳转 */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button onClick={() => onGotoOffset(dayOffset - 1)} disabled={dayOffset <= minOffset} className={navBtn}>
                <span aria-hidden>‹</span> 前一日
              </button>
              <button onClick={() => onGotoOffset(dayOffset + 1)} disabled={dayOffset >= maxOffset} className={navBtn}>
                后一日 <span aria-hidden>›</span>
              </button>
              <input
                type="date"
                aria-label="跳转到指定日期"
                value={fmtInput(date)}
                min={fmtInput(minDate)}
                max={fmtInput(maxDate)}
                onChange={(e) => onPickDate(e.target.value)}
                className="border border-gold/40 bg-card px-3 py-2 font-num text-xs tracking-widest text-rice transition-colors duration-300 hover:border-gold focus:border-gold focus:outline-none [color-scheme:light]"
              />
            </div>

            {/* 今 / 明日课切换 */}
            <div className="mt-5 flex flex-wrap items-center gap-5">
              <button
                onClick={() => onGotoOffset(dayOffset === 0 ? 1 : 0)}
                className="group inline-flex items-center gap-3 border border-gold/40 px-6 py-3 text-sm tracking-[0.35em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10"
              >
                {dayOffset !== 0 ? (
                  <>
                    <span aria-hidden>←</span> 回到今日
                  </>
                ) : (
                  <>
                    预习明日 <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </>
                )}
              </button>
              <span className="text-xs leading-5 tracking-[0.2em] text-dim">
                {isTomorrow
                  ? '正在查看明天的四课，明日再来即自动刷新'
                  : isReview
                    ? '正在复习往日日课，点「回到今日」返回今天'
                    : '晚间修习，不妨提前一观明日；也可用箭头翻阅往日'}
              </span>
            </div>

            <p className="mt-8 max-w-xl text-sm leading-7 tracking-wider text-dim">
              观天之道，执天之行。{dayOffset !== 0 ? (isTomorrow ? '明日' : '当日') : '今日'}{almanac.dayGod.god}
              <GlossaryTerm term="值神">值日</GlossaryTerm>，建除逢「{almanac.jianChu.name}」；
              节气行至「{term.info.name}」，<GlossaryTerm term="太阳黄经">太阳黄经</GlossaryTerm>{' '}
              {Math.round(term.longitudeNow)}°。
              向下慢行，修习{isTomorrow ? '明日' : isReview ? '当日' : '今日'}四课。
            </p>
          </div>

          {/* 黄道图 */}
          <div className="hidden lg:block">
            <EclipticRing longitude={term.longitudeNow} size={380} />
            <p className="mt-2 text-center text-xs tracking-[0.3em] text-dim">
              地球公转 · 当前黄经 {Math.round(term.longitudeNow)}°
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
