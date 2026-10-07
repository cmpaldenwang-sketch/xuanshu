// ============================================================
// 玄枢 · 日期锚点与轮换逻辑
// 建站锚点：2026-10-07 为第 1 天（diffDays = 0）。
// 支持 ?date=YYYY-MM-DD 查询参数，便于验收每日轮换。
// ============================================================

export const ANCHOR_DATE = new Date(2026, 9, 7) // 2026-10-07（月从 0 起）

export function getViewDate(): Date {
  const params = new URLSearchParams(window.location.search)
  const raw = params.get('date')
  if (raw) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw.trim())
    if (m) {
      return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12, 0, 0)
    }
  }
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0)
}

/** 与锚点的日差：2026-10-07 → 0，2026-10-08 → 1 */
export function diffDays(date: Date): number {
  const a = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12)
  const b = new Date(ANCHOR_DATE.getFullYear(), ANCHOR_DATE.getMonth(), ANCHOR_DATE.getDate(), 12)
  return Math.round((a.getTime() - b.getTime()) / 86400000)
}

export function mod(n: number, m: number): number {
  return ((n % m) + m) % m
}

/** 第 N 天（1 起计），用于展示 */
export function dayNumber(date: Date): number {
  return diffDays(date) + 1
}
