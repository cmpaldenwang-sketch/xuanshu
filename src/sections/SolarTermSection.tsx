import type { CurrentTermState } from '@/lib/solarTerms'
import { TERM_INFO } from '@/lib/solarTerms'
import { EclipticRing, Reveal, SectionHeading } from '@/components/decor'
import { GlossaryTerm } from '@/components/GlossaryTerm'

function fmtTermTime(d: Date): string {
  // 以北京时间显示
  const bj = new Date(d.getTime() + 8 * 3600000)
  const m = bj.getUTCMonth() + 1
  const day = bj.getUTCDate()
  const h = String(bj.getUTCHours()).padStart(2, '0')
  const min = String(bj.getUTCMinutes()).padStart(2, '0')
  return `${m}月${day}日 ${h}:${min}`
}

export default function SolarTermSection({ term }: { term: CurrentTermState }) {
  const { info, nextInfo, countdown } = term
  return (
    <section id="solar-term" className="relative scroll-mt-20 border-t border-gold/10 bg-card/40 py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <Reveal>
          <SectionHeading num="贰" title="节气详解" sub="太阳黄经 · 物候三候 · 公转之理" />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[auto_1fr]">
          {/* 黄道图 */}
          <Reveal>
            <div className="gold-card rounded-sm p-6">
              <EclipticRing longitude={term.longitudeNow} size={330} />
              <div className="mt-4 text-center">
                <p className="text-sm tracking-[0.3em] text-gold">太阳黄经 {Math.round(term.longitudeNow)}°</p>
                <p className="mt-1 text-xs tracking-widest text-dim">地球当前位置 · 公转方向逆时针</p>
              </div>
            </div>
          </Reveal>

          {/* 节气正文 */}
          <div>
            <Reveal>
              <div className="gold-card rounded-sm p-7 md:p-9">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <h3 className="text-4xl font-black tracking-[0.2em] text-rice md:text-5xl">
                    {info.name}
                    <span className="ml-4 align-middle text-sm font-normal tracking-[0.3em] text-dim">
                      <GlossaryTerm term="太阳黄经">黄经</GlossaryTerm> {info.longitude}°
                    </span>
                  </h3>
                  <div className="text-right">
                    <p className="text-xs tracking-[0.3em] text-dim">距「{nextInfo.name}」</p>
                    <p className="mt-1 font-num text-2xl text-gold">
                      {countdown.days} 天 {String(countdown.hours).padStart(2, '0')} 时 {String(countdown.minutes).padStart(2, '0')} 分
                    </p>
                    <p className="mt-1 text-xs tracking-wider text-dim">{fmtTermTime(term.next.time)} 交节（北京时间）</p>
                  </div>
                </div>

                {/* 三候 */}
                <div className="mt-7 grid grid-cols-3 gap-3">
                  {info.sanshou.map((s, i) => (
                    <div
                      key={s}
                      className={`rounded-sm border px-3 py-3 text-center ${
                        i === term.houIndex ? 'border-gold/50 bg-gold/10' : 'border-gold/12'
                      }`}
                    >
                      <p className="text-[11px] tracking-[0.25em] text-dim">{['初候', '二候', '三候'][i]}</p>
                      <p className={`mt-1 text-[15px] tracking-wider ${i === term.houIndex ? 'text-gold' : 'text-rice/85'}`}>{s}</p>
                    </div>
                  ))}
                </div>

                {/* 大白话科普 */}
                <div className="mt-7 rounded-sm border border-gold/20 bg-gold/5 p-5">
                  <p className="text-xs tracking-[0.3em] text-gold">大白话科普</p>
                  <p className="mt-2 text-sm leading-7 tracking-wider text-rice/85">
                    地球绕着太阳转圈，<GlossaryTerm term="节气">二十四节气</GlossaryTerm>就是这个圆圈上的 24
                    个刻度，<GlossaryTerm term="太阳黄经">太阳黄经</GlossaryTerm>就是进度条读数——每走 15°
                    翻一页。因为地球自转轴是歪的（斜了 23.5°），转到不同位置，阳光照在北半球的角度和时长就不一样，
                    于是有了春夏秋冬。节气跟月亮无关，所以它的公历日期每年都差不多。而
                    <GlossaryTerm term="三候">三候</GlossaryTerm>，就是每个节气里古人观察到的三段小变化。
                  </p>
                </div>

                <p className="mt-7 text-[15px] leading-8 tracking-wider text-rice/85">{info.intro}</p>

                <div className="mt-6 border-l-2 border-gold/40 bg-gold/5 py-4 pl-5 pr-4">
                  <p className="text-xs tracking-[0.3em] text-gold">与地球公转的关系</p>
                  <p className="mt-2 text-sm leading-7 tracking-wider text-rice/75">{info.astronomy}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 二十四节气年表 */}
        <Reveal className="mt-10">
          <div className="gold-card rounded-sm p-6 md:p-8">
            <p className="mb-5 text-sm tracking-[0.3em] text-dim">二十四节气 · 黄经一览</p>
            <div className="grid grid-cols-4 gap-px overflow-hidden rounded-sm border border-gold/12 sm:grid-cols-6 lg:grid-cols-8">
              {TERM_INFO.map((t) => (
                <div
                  key={t.name}
                  className={`flex flex-col items-center gap-1 px-2 py-3 ${
                    t.name === info.name ? 'bg-gold/15' : t.name === nextInfo.name ? 'bg-gold/6' : ''
                  }`}
                >
                  <span className={`text-[15px] tracking-wider ${t.name === info.name ? 'font-bold text-gold' : 'text-rice/80'}`}>
                    {t.name}
                  </span>
                  <span className="text-[10px] tracking-widest text-dim/70">{t.longitude}°</span>
                  {t.name === info.name && <span className="rounded-[2px] bg-gold px-1.5 text-[10px] text-ink">当前</span>}
                  {t.name === nextInfo.name && <span className="rounded-[2px] border border-gold/40 px-1.5 text-[10px] text-gold">将至</span>}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
