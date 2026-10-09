import { HEXAGRAMS, QIAN_YAO, type Hexagram } from '@/lib/hexagrams'
import { GuaPaint, Reveal, SectionHeading, Seal } from '@/components/decor'
import { GlossaryTerm } from '@/components/GlossaryTerm'

function TodayHexagram({ hex }: { hex: Hexagram }) {
  const isQian = hex.id === 1
  return (
    <div className="gold-card relative rounded-sm p-7 md:p-10">
      <div className="absolute right-6 top-6 opacity-90">
        <Seal size={40} text={`第${hex.id}卦`} />
      </div>
      <div className="flex flex-wrap items-start gap-8">
        <div className="flex flex-col items-center gap-3">
          <GuaPaint lines={hex.lines} width={88} color="#2B2620" />
          <p className="text-xs tracking-[0.3em] text-dim">
            {hex.upper}上{hex.lower}下
          </p>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs tracking-[0.35em] text-dim">
            周易第 {hex.id} <GlossaryTerm term="卦">卦</GlossaryTerm>
          </p>
          <h3 className="mt-2 text-4xl font-black tracking-[0.15em] text-rice md:text-5xl">{hex.name}</h3>
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs tracking-[0.35em] text-gold">
                <GlossaryTerm term="卦辞">卦 辞</GlossaryTerm>
              </p>
              <p className="mt-1.5 text-xl font-semibold leading-9 tracking-[0.1em] text-rice">{hex.guaCi}</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.35em] text-gold">
                <GlossaryTerm term="象传">象 曰</GlossaryTerm>
              </p>
              <p className="mt-1.5 text-xl font-semibold leading-9 tracking-[0.1em] text-rice">{hex.xiangYue}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-7 border-t border-gold/15 pt-6">
        <p className="text-[15px] leading-8 tracking-wider text-rice/85">
          <span className="mr-2 inline-block bg-gold/15 px-2 py-0.5 align-middle text-xs tracking-[0.25em] text-gold">大白话</span>
          {hex.brief}
        </p>
      </div>

      {isQian && (
        <div className="mt-8">
          <p className="text-sm tracking-[0.35em] text-dim">
            六<GlossaryTerm term="爻">爻</GlossaryTerm>串讲 · 人生六阶段
          </p>
          <div className="mt-5 space-y-0">
            {QIAN_YAO.map((yao, i) => (
              <div key={yao.name} className="relative grid gap-2 pb-7 pl-8 md:grid-cols-[130px_1fr] md:gap-6">
                {/* 时间轴 */}
                {i < QIAN_YAO.length - 1 && (
                  <span className="absolute left-[7px] top-6 h-full w-px bg-gold/20" aria-hidden />
                )}
                <span className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border border-gold/60 bg-card" aria-hidden>
                  <span className="absolute inset-[4px] rounded-full bg-gold" />
                </span>
                <div>
                  <p className="font-semibold tracking-[0.25em] text-gold">{yao.name}</p>
                  <p className="mt-1 text-[15px] tracking-wider text-rice/90">{yao.ci}</p>
                </div>
                <p className="text-sm leading-7 tracking-wider text-rice/70">{yao.reading}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function HexaGrid({ todayId }: { todayId: number }) {
  return (
    <div className="gold-card rounded-sm p-6 md:p-8">
      <div className="mb-5 flex items-baseline justify-between">
        <p className="text-sm tracking-[0.35em] text-dim">六十四卦总览</p>
        <p className="text-xs tracking-widest text-dim/60">按周易卦序排列</p>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
        {HEXAGRAMS.map((h) => {
          const active = h.id === todayId
          return (
            <div
              key={h.id}
              title={`${h.id}. ${h.name}`}
              className={`group flex flex-col items-center gap-1.5 rounded-sm border px-1 py-3 transition-all duration-300 ${
                active
                  ? 'border-gold bg-gold/15 shadow-glow'
                  : 'border-transparent hover:border-gold/25 hover:bg-gold/5'
              }`}
            >
              <GuaPaint lines={h.lines} width={30} color={active ? '#A8823F' : '#6E6555'} />
              <span className={`text-center text-[11px] leading-tight tracking-wider ${active ? 'font-bold text-gold' : 'text-dim group-hover:text-rice/80'}`}>
                {h.name}
              </span>
              <span className={`font-num text-[9px] ${active ? 'text-gold' : 'text-dim/50'}`}>{h.id}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function HexagramSection({ hex }: { hex: Hexagram }) {
  return (
    <section id="hexagram" className="scroll-mt-20 border-t border-gold/10 bg-card/40 py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <Reveal>
          <SectionHeading num="肆" title="每日一卦" sub="周易六十四卦 · 每日一巡" />
        </Reveal>
        <Reveal>
          <p className="mb-6 text-sm leading-7 tracking-wider text-dim">
            <span className="mr-2 inline-block bg-gold/15 px-2 py-0.5 text-xs tracking-[0.25em] text-gold">一句话秒懂</span>
            <GlossaryTerm term="卦">卦</GlossaryTerm>是六条横线组成的图案——实线是
            <GlossaryTerm term="阳爻">阳爻</GlossaryTerm>、断线是<GlossaryTerm term="阴爻">阴爻</GlossaryTerm>，
            六条线 64 种组合，就是 64 种「人生局面模型」。每天看一卦，读它的
            <GlossaryTerm term="卦辞">卦辞</GlossaryTerm>和<GlossaryTerm term="象传">象传</GlossaryTerm>，
            再看下面那句大白话提醒就够了。
          </p>
        </Reveal>
        <Reveal>
          <TodayHexagram hex={hex} />
        </Reveal>
        <Reveal className="mt-8" delay={100}>
          <HexaGrid todayId={hex.id} />
        </Reveal>
      </div>
    </section>
  )
}
