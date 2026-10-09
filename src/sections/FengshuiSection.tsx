import { useEffect, useState } from 'react'
import { FS_LESSONS, FS_MODULES, type FsLesson } from '@/lib/fengshui'
import { Reveal, SectionHeading, Seal } from '@/components/decor'
import { GlossaryTerm, Rich } from '@/components/GlossaryTerm'
import { BaguaMap, NinePalace, WuxingCycle } from '@/components/figures'

const FIGURE_META = {
  wuxing: { label: '图说 · 五行相生相克', node: <WuxingCycle size={310} /> },
  bagua: { label: '图说 · 后天八卦方位', node: <BaguaMap size={310} /> },
  palace: { label: '图说 · 九宫格', node: <NinePalace size={290} /> },
} as const

function LessonFigure({ kind }: { kind: NonNullable<FsLesson['figure']> }) {
  const meta = FIGURE_META[kind]
  return (
    <figure className="my-7 rounded-sm border border-gold/25 bg-white/40 px-4 py-6">
      {meta.node}
      <figcaption className="mt-3 text-center text-xs tracking-[0.3em] text-dim">{meta.label}</figcaption>
    </figure>
  )
}

export default function FengshuiSection({ lesson, dayLabel = '今日' }: { lesson: FsLesson; dayLabel?: string }) {
  const [selectedId, setSelectedId] = useState(lesson.id)
  // 日期切换后，课程卡回到当日课
  useEffect(() => {
    setSelectedId(lesson.id)
  }, [lesson.id])
  const shown = FS_LESSONS.find((l) => l.id === selectedId) ?? lesson
  const isDayLesson = shown.id === lesson.id

  return (
    <section id="fengshui" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 md:px-8">
      <Reveal>
        <SectionHeading num="叁" title="风水日课" sub="二十四课 · 六模块 · 每日一课" />
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* 今日课程 */}
        <Reveal>
          <article className="gold-card relative rounded-sm p-7 md:p-10">
            <div className="absolute right-6 top-6 opacity-90">
              <Seal size={40} text={`第${shown.id}课`} />
            </div>
            <p className="text-xs tracking-[0.35em] text-dim">
              第 {String(shown.id).padStart(2, '0')} 课 · 模块{['一', '二', '三', '四', '五', '六'][shown.moduleIndex]}「
              {shown.module}」
              {isDayLesson ? (
                <span className="ml-3 rounded-[2px] bg-gold px-1.5 py-0.5 text-[10px] tracking-[0.2em] text-ink">{dayLabel}之课</span>
              ) : (
                <span className="ml-3 rounded-[2px] border border-gold/50 px-1.5 py-0.5 text-[10px] tracking-[0.2em] text-gold">回看中</span>
              )}
            </p>
            <h3 className="mt-3 max-w-[75%] text-2xl font-bold leading-snug tracking-wider text-rice md:text-3xl">
              {shown.title}
            </h3>
            {/* 一句话秒懂 */}
            <div className="mt-5 inline-flex max-w-full items-start gap-3 rounded-sm border border-gold/25 bg-gold/8 px-4 py-3">
              <span className="mt-0.5 shrink-0 bg-gold px-2 py-0.5 text-[11px] tracking-[0.2em] text-ink">秒懂</span>
              <p className="text-[15px] leading-7 tracking-wider text-gold">{shown.oneLiner}</p>
            </div>
            <div className="mt-4 h-px w-24 bg-gold/40" />
            <div className="mt-6 space-y-5">
              {shown.paragraphs.map((p, i) => (
                <div key={i}>
                  <p className="text-[15px] leading-8 tracking-wider text-rice/85">
                    <Rich text={p} />
                  </p>
                  {/* 插图插在第二段之后 */}
                  {shown.figure && i === 1 && <LessonFigure kind={shown.figure} />}
                </div>
              ))}
            </div>
            <div className="mt-8 border-l-2 border-gold bg-gold/5 py-4 pl-5 pr-4">
              <p className="text-xs tracking-[0.35em] text-gold">{isDayLesson ? dayLabel : '当日'}实践 · 回家就能做</p>
              <p className="mt-2 text-[15px] leading-7 tracking-wider text-rice/90">
                <Rich text={shown.practice} />
              </p>
            </div>
          </article>
        </Reveal>

        {/* 课程大纲 */}
        <Reveal delay={120}>
          <aside className="gold-card h-fit rounded-sm p-6">
            <p className="text-sm tracking-[0.35em] text-dim">课程大纲</p>
            <p className="mt-1 text-xs leading-5 tracking-widest text-dim/60">
              六模块 · 二十四课 · 循环修习
              <br />
              点击任意一课，随时回看；遇到<GlossaryTerm term="九宫">金色虚线词</GlossaryTerm>，点开有白话解释
            </p>
            <div className="mt-5 space-y-5">
              {FS_MODULES.map((mod, mi) => (
                <div key={mod}>
                  <p className="flex items-center gap-2 text-[15px] font-semibold tracking-widest text-gold">
                    <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold/70" />
                    {['壹', '贰', '叁', '肆', '伍', '陆'][mi]} · {mod}
                  </p>
                  <ul className="mt-2 space-y-1.5 border-l border-gold/15 pl-4">
                    {FS_LESSONS.filter((l) => l.moduleIndex === mi).map((l) => (
                      <li key={l.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedId(l.id)}
                          aria-pressed={l.id === shown.id}
                          className={`w-full text-left text-[13px] leading-6 tracking-wider transition-colors ${
                            l.id === shown.id ? 'font-semibold text-gold' : 'text-dim hover:text-rice/80'
                          }`}
                        >
                          <span className="mr-2 font-num text-[11px] text-dim/60">{String(l.id).padStart(2, '0')}</span>
                          {l.title}
                          {l.id === lesson.id && (
                            <span className="ml-2 rounded-[2px] bg-gold px-1.5 py-0.5 text-[10px] text-ink">{dayLabel}</span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  )
}
