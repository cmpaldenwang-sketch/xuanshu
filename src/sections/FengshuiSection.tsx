import { FS_LESSONS, FS_MODULES, type FsLesson } from '@/lib/fengshui'
import { Reveal, SectionHeading, Seal } from '@/components/decor'

export default function FengshuiSection({ lesson }: { lesson: FsLesson }) {
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
              <Seal size={40} text={`第${lesson.id}课`} />
            </div>
            <p className="text-xs tracking-[0.35em] text-dim">
              第 {String(lesson.id).padStart(2, '0')} 课 · 模块{['一', '二', '三', '四', '五', '六'][lesson.moduleIndex]}「
              {lesson.module}」
            </p>
            <h3 className="mt-3 max-w-[75%] text-2xl font-bold leading-snug tracking-wider text-rice md:text-3xl">
              {lesson.title}
            </h3>
            <div className="mt-4 h-px w-24 bg-gold/40" />
            <div className="mt-6 space-y-5">
              {lesson.paragraphs.map((p, i) => (
                <p key={i} className="text-[15px] leading-8 tracking-wider text-rice/85">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8 border-l-2 border-gold bg-gold/5 py-4 pl-5 pr-4">
              <p className="text-xs tracking-[0.35em] text-gold">今日实践</p>
              <p className="mt-2 text-[15px] leading-7 tracking-wider text-rice/90">{lesson.practice}</p>
            </div>
          </article>
        </Reveal>

        {/* 课程大纲 */}
        <Reveal delay={120}>
          <aside className="gold-card h-fit rounded-sm p-6">
            <p className="text-sm tracking-[0.35em] text-dim">课程大纲</p>
            <p className="mt-1 text-xs tracking-widest text-dim/60">六模块 · 二十四课 · 循环修习</p>
            <div className="mt-5 space-y-5">
              {FS_MODULES.map((mod, mi) => (
                <div key={mod}>
                  <p className="flex items-center gap-2 text-[15px] font-semibold tracking-widest text-gold">
                    <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold/70" />
                    {['壹', '贰', '叁', '肆', '伍', '陆'][mi]} · {mod}
                  </p>
                  <ul className="mt-2 space-y-1.5 border-l border-gold/15 pl-4">
                    {FS_LESSONS.filter((l) => l.moduleIndex === mi).map((l) => (
                      <li
                        key={l.id}
                        className={`text-[13px] leading-6 tracking-wider transition-colors ${
                          l.id === lesson.id ? 'font-semibold text-gold' : 'text-dim hover:text-rice/80'
                        }`}
                      >
                        <span className="mr-2 font-num text-[11px] text-dim/60">{String(l.id).padStart(2, '0')}</span>
                        {l.title}
                        {l.id === lesson.id && <span className="ml-2 rounded-[2px] bg-gold px-1.5 py-0.5 text-[10px] text-ink">今日</span>}
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
