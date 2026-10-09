import { useEffect, useRef, useState, type ReactNode } from 'react'
import { lookupTerm } from '@/lib/glossary'

/**
 * 术语气泡：专业词包一层「金色虚线下划线」，
 * 点击/触摸弹出白话解释小卡片；点击空白或再次点击关闭。
 * 用法：<GlossaryTerm term="纳音" /> 或 <GlossaryTerm term="日主">日主（丙火）</GlossaryTerm>
 */
export function GlossaryTerm({ term, children, inherit = false }: { term: string; children?: ReactNode; inherit?: boolean }) {
  const entry = lookupTerm(term)
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('touchstart', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('touchstart', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // 词典里没有的词，直接渲染原文，不误导点击
  if (!entry) return <>{children ?? term}</>

  return (
    <span ref={rootRef} className="relative inline-block">
      <button
        type="button"
        aria-label={`术语解释：${term}`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`cursor-help border-b border-dashed pb-px transition-colors ${
          inherit
            ? 'border-current/70 text-inherit hover:opacity-80'
            : 'border-gold/60 text-gold hover:border-gold hover:text-[#E8C876]'
        }`}
      >
        {children ?? term}
      </button>
      {open && (
        <span
          role="tooltip"
          className="glossary-pop absolute bottom-full left-1/2 z-50 mb-2 block w-64 -translate-x-1/2 rounded-sm border border-gold/40 bg-[#221D14] p-3.5 text-left shadow-[0_8px_32px_rgba(0,0,0,0.55)] sm:w-72"
        >
          <span className="mb-1 block text-xs font-semibold tracking-[0.3em] text-gold">{entry.term}</span>
          <span className="block text-[13px] leading-6 tracking-wider text-rice/90">{entry.plain}</span>
          <span
            aria-hidden
            className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-gold/40 bg-[#221D14]"
          />
        </span>
      )}
    </span>
  )
}

/**
 * 轻量富文本渲染：正文中的 [[术语]] 或 [[术语|显示文字]] 会被替换为 GlossaryTerm。
 * 供数据文件（课程正文等纯字符串）使用。
 */
export function Rich({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\[\[[^\]]+\]\])/g)
  return (
    <span className={className}>
      {parts.map((p, i) => {
        const m = /^\[\[([^\]|]+)(\|([^\]]+))?\]\]$/.exec(p)
        if (!m) return <span key={i}>{p}</span>
        const term = m[1]
        const display = m[3]
        return (
          <GlossaryTerm key={i} term={term}>
            {display ?? term}
          </GlossaryTerm>
        )
      })}
    </span>
  )
}
