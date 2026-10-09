import type { Almanac } from '@/lib/almanac'
import { HourStrip, Reveal, SectionHeading, YiJiBlock } from '@/components/decor'
import { GlossaryTerm } from '@/components/GlossaryTerm'

function GanzhiPillar({ label, gz, nayin }: { label: string; gz: string; nayin: string }) {
  return (
    <div className="gold-card flex flex-col items-center rounded-sm px-2 py-5">
      <span className="text-xs tracking-[0.35em] text-dim">{label}</span>
      <span className="mt-3 flex flex-col items-center text-3xl font-bold leading-snug text-rice md:text-4xl">
        <span>{gz[0]}</span>
        <span className="text-gold">{gz[1]}</span>
      </span>
      <span className="mt-3 text-xs tracking-widest text-dim">
        <GlossaryTerm term="纳音">{nayin}</GlossaryTerm>
      </span>
    </div>
  )
}

export default function AlmanacSection({ almanac, dayLabel = '今日' }: { almanac: Almanac; dayLabel?: string }) {
  const a = almanac
  return (
    <section id="almanac" className="relative mx-auto max-w-6xl scroll-mt-20 px-4 py-20 md:px-8">
      <Reveal>
        <SectionHeading num="壹" title={`${dayLabel}黄历`} sub="阴阳历合参 · 建除黄道 · 彭祖百忌" />
      </Reveal>

      {/* 一句话秒懂 */}
      <Reveal>
        <p className="mb-6 text-sm leading-7 tracking-wider text-dim">
          <span className="mr-2 inline-block bg-gold/15 px-2 py-0.5 text-xs tracking-[0.25em] text-gold">一句话秒懂</span>
          黄历就是古人的「每日行事参考」：上面三柱是今天的
          <GlossaryTerm term="干支">干支</GlossaryTerm>
          编号，下面是值班的
          <GlossaryTerm term="值神">神煞</GlossaryTerm>
          、宜忌清单和时辰吉凶。金色虚线的词都可以点开看白话解释。
        </p>
      </Reveal>

      {/* 四柱干支 */}
      <Reveal>
        <div className="grid grid-cols-3 gap-3 md:gap-5">
          <GanzhiPillar label="年 柱" gz={a.yearGz} nayin={a.yearNayin} />
          <GanzhiPillar label="月 柱" gz={a.monthGz} nayin={a.monthNayin} />
          <GanzhiPillar label="日 柱" gz={a.dayGz} nayin={a.dayNayin} />
        </div>
      </Reveal>

      {/* 黄道 / 建除 / 冲煞 / 胎神 */}
      <Reveal className="mt-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="gold-card rounded-sm p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm tracking-[0.3em] text-dim">
                <GlossaryTerm term="值神">值日神煞</GlossaryTerm>
              </span>
              <span
                className={`rounded-[2px] px-3 py-1 text-sm tracking-[0.3em] ${
                  a.dayGod.isAuspicious ? 'bg-gold text-ink' : 'bg-vermilion/80 text-[#FFF6E8]'
                }`}
              >
                <GlossaryTerm term={a.dayGod.isAuspicious ? '黄道日' : '黑道日'} inherit>
                  {a.dayGod.isAuspicious ? '黄道吉日' : '黑道日'}
                </GlossaryTerm>
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold tracking-[0.3em] text-rice">
              {a.dayGod.god}
              <span className="mx-3 text-gold">·</span>
              <span className="text-2xl text-gold">
                <GlossaryTerm term={`${a.jianChu.name}日`}>{a.jianChu.name}日</GlossaryTerm>
              </span>
            </p>
            <p className="mt-3 text-sm leading-7 text-rice/75">{a.dayGod.brief}</p>
            <p className="mt-2 text-sm leading-7 text-dim">
              <GlossaryTerm term="建除十二神">建除十二神</GlossaryTerm>·{a.jianChu.name}：
              <span className="text-rice/85">{a.jianChu.plain}</span>
            </p>
          </div>

          <div className="gold-card rounded-sm p-6">
            <span className="text-sm tracking-[0.3em] text-dim">
              <GlossaryTerm term="冲煞">冲煞</GlossaryTerm> · <GlossaryTerm term="胎神">胎神</GlossaryTerm>
            </span>
            <p className="mt-4 text-2xl font-bold tracking-[0.2em] text-rice">{a.chongSha}</p>
            <p className="mt-2 text-sm tracking-wider text-dim">胎神占方：{a.taiShen}</p>
            <div className="mt-5 border-t border-gold/15 pt-4">
              <span className="text-sm tracking-[0.3em] text-dim">
                <GlossaryTerm term="彭祖百忌">彭祖百忌</GlossaryTerm>
              </span>
              <p className="mt-3 text-[15px] leading-8 tracking-wider text-rice/85">
                {a.pengZu[0]}
                <br />
                {a.pengZu[1]}
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 宜忌 */}
      <Reveal className="mt-6">
        <div className="grid gap-4 md:grid-cols-2">
          <YiJiBlock kind="宜" items={a.jianChu.yi} />
          <YiJiBlock kind="忌" items={a.jianChu.ji} />
        </div>
      </Reveal>

      {/* 时辰吉凶 */}
      <Reveal className="mt-6">
        <div className="gold-card rounded-sm p-6">
          <div className="mb-4 flex items-baseline justify-between">
            <span className="text-sm tracking-[0.3em] text-dim">十二时辰吉凶</span>
            <span className="text-xs tracking-widest text-dim/70">金为吉时 · 暗为凶时</span>
          </div>
          <HourStrip hours={a.hours} />
        </div>
      </Reveal>
    </section>
  )
}
