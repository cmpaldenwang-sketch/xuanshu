import { BING_ESSAY, STEM_CARDS, STEM_ROTATION, type StemCard } from '@/lib/stems'
import { Reveal, SectionHeading, Seal } from '@/components/decor'

function StemCardView({ card, isToday, dayLabel }: { card: StemCard; isToday: boolean; dayLabel: string }) {
  return (
    <div className={`gold-card flex h-full flex-col rounded-sm p-5 ${isToday ? 'border-gold/60 shadow-glow' : ''}`}>
      <div className="flex items-center gap-4">
        <span
          className={`flex h-14 w-14 items-center justify-center rounded-sm text-3xl font-black ${
            isToday ? 'bg-gold text-ink' : 'bg-gold/10 text-gold'
          }`}
        >
          {card.stem}
        </span>
        <div>
          <p className="text-sm tracking-[0.25em] text-rice">
            {card.element} · {card.yinYang}
          </p>
          <p className="mt-0.5 text-xs tracking-widest text-dim">{card.yinYang === '阳' ? '刚健外显' : '柔润内敛'}</p>
        </div>
        {isToday && <span className="ml-auto rounded-[2px] bg-gold px-2 py-0.5 text-[10px] tracking-widest text-ink">{dayLabel}轮值</span>}
      </div>
      <p className="mt-4 text-[13px] leading-6 tracking-wider text-gold/90">{card.image}</p>
      <ul className="mt-3 space-y-1">
        {card.traits.map((t) => (
          <li key={t} className="flex gap-2 text-[13px] leading-6 tracking-wider text-rice/80">
            <span className="mt-[9px] h-1 w-1 shrink-0 rotate-45 bg-gold/60" />
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-4 space-y-2 border-t border-gold/12 pt-3 text-[12.5px] leading-6 tracking-wider">
        <p className="text-rice/70">
          <span className="text-gold">喜　</span>
          {card.like}
        </p>
        <p className="text-rice/70">
          <span className="text-vermilion">忌　</span>
          {card.dislike}
        </p>
        <p className="text-dim">
          <span className="text-dim/80">调候　</span>
          {card.seasons}
        </p>
      </div>
      <p className="mt-auto pt-4 text-[13px] font-semibold leading-6 tracking-wider text-rice/90">— {card.verdict}</p>
    </div>
  )
}

export default function BaziSection({ todayStem, dayLabel = '今日' }: { todayStem: string; dayLabel?: string }) {
  return (
    <section id="bazi" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 md:px-8">
      <Reveal>
        <SectionHeading num="伍" title="八字专栏" sub="十天干心性录 · 每日一干" />
      </Reveal>

      {/* 丙火男深度解析（常设） */}
      <Reveal>
        <article className="gold-card relative overflow-hidden rounded-sm p-7 md:p-10">
          <div className="pointer-events-none absolute -right-10 -top-10 opacity-[0.06]" aria-hidden>
            <svg width="240" height="240" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="38" fill="none" stroke="#C9A35C" strokeWidth="1" />
              <circle cx="50" cy="50" r="18" fill="#C9A35C" />
              {Array.from({ length: 12 }).map((_, i) => {
                const a = (i * Math.PI) / 6
                return (
                  <line
                    key={i}
                    x1={50 + 26 * Math.cos(a)}
                    y1={50 + 26 * Math.sin(a)}
                    x2={50 + 36 * Math.cos(a)}
                    y2={50 + 36 * Math.sin(a)}
                    stroke="#C9A35C"
                    strokeWidth="1.5"
                  />
                )
              })}
            </svg>
          </div>
          <div className="flex items-center gap-4">
            <Seal size={44} text="丙火" />
            <div>
              <h3 className="text-2xl font-bold tracking-[0.2em] text-rice md:text-3xl">{BING_ESSAY.title}</h3>
              <p className="mt-1 text-sm tracking-[0.3em] text-gold">{BING_ESSAY.subtitle}</p>
            </div>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {BING_ESSAY.sections.map((s) => (
              <div key={s.heading} className={s.heading.includes('双丙火') ? 'md:col-span-2' : ''}>
                <p className="flex items-center gap-2.5 text-base font-semibold tracking-[0.25em] text-gold">
                  <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
                  {s.heading}
                </p>
                <p className="mt-3 text-[14.5px] leading-8 tracking-wider text-rice/80">{s.body}</p>
              </div>
            ))}
          </div>
        </article>
      </Reveal>

      {/* 十天干轮值 */}
      <Reveal className="mt-10">
        <div className="mb-5 flex items-baseline justify-between">
          <p className="text-sm tracking-[0.35em] text-dim">
            十日轮转 · {dayLabel}值「<span className="text-lg font-bold text-gold">{todayStem}</span>」
          </p>
          <p className="text-xs tracking-widest text-dim/60">{STEM_ROTATION.join(' → ')}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {STEM_ROTATION.map((s) => (
            <StemCardView key={s} card={STEM_CARDS[s]} isToday={s === todayStem} dayLabel={dayLabel} />
          ))}
        </div>
      </Reveal>
    </section>
  )
}
