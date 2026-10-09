// ============================================================
// 玄枢 · 风水课插图组件（金色线条 SVG，暗夜金墨风）
// ============================================================

/** 五行生克环：金木水火土环形 + 相生外环箭头 + 相克内五角 */
export function WuxingCycle({ size = 320 }: { size?: number }) {
  const cx = 160
  const cy = 160
  const r = 108
  // 五行方位：火在南（上）、水在北（下）、木在东（左）、金在西（右）、土居中
  // 环形排布顺序（顺时针相生）：木→火→土→金→水→木
  const items = [
    { name: '木', en: '生发', angle: -90 },
    { name: '火', en: '炎上', angle: -18 },
    { name: '土', en: '承载', angle: 54 },
    { name: '金', en: '收敛', angle: 126 },
    { name: '水', en: '润下', angle: 198 },
  ]
  const pt = (angle: number, rr = r) => {
    const a = (angle * Math.PI) / 180
    return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)] as const
  }
  return (
    <svg viewBox="0 0 320 320" width={size} height={size} className="mx-auto" role="img" aria-label="五行相生相克图">
      <defs>
        <marker id="wxArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1.5 L 9 5 L 0 8.5" fill="none" stroke="#A8823F" strokeWidth="1.2" />
        </marker>
      </defs>
      {/* 相生外环（顺时针）：木→火→土→金→水→木 */}
      {items.map((it, i) => {
        const next = items[(i + 1) % 5]
        const [x1, y1] = pt(it.angle + 26, r)
        const [x2, y2] = pt(next.angle - 26, r)
        return (
          <path
            key={`sheng-${it.name}`}
            d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
            fill="none"
            stroke="#A8823F"
            strokeOpacity="0.75"
            strokeWidth="1.2"
            markerEnd="url(#wxArrow)"
          />
        )
      })}
      {/* 相克内五角星 */}
      {items.map((it, i) => {
        const tgt = items[(i + 2) % 5]
        const [x1, y1] = pt(it.angle, r - 34)
        const [x2, y2] = pt(tgt.angle, r - 34)
        return (
          <line
            key={`ke-${it.name}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#A63A2B"
            strokeOpacity="0.4"
            strokeWidth="0.9"
            strokeDasharray="3 3"
          />
        )
      })}
      {/* 节点 */}
      {items.map((it) => {
        const [x, y] = pt(it.angle)
        return (
          <g key={it.name}>
            <circle cx={x} cy={y} r="24" fill="#FFFDF7" stroke="#A8823F" strokeOpacity="0.6" strokeWidth="1" />
            <text x={x} y={y - 2} textAnchor="middle" dominantBaseline="central" fontSize="19" fontWeight="700" fill="#A8823F" fontFamily="'Songti SC','Noto Serif SC',serif">
              {it.name}
            </text>
            <text x={x} y={y + 13} textAnchor="middle" dominantBaseline="central" fontSize="7.5" fill="#6E6555" fontFamily="'Songti SC','Noto Serif SC',serif">
              {it.en}
            </text>
          </g>
        )
      })}
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="11" fill="#A8823F" fontFamily="'Songti SC','Noto Serif SC',serif" letterSpacing="3">
        相生
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="11" fill="#A63A2B" fillOpacity="0.85" fontFamily="'Songti SC','Noto Serif SC',serif" letterSpacing="3">
        相克
      </text>
    </svg>
  )
}

/** 后天八卦方位图 */
export function BaguaMap({ size = 320 }: { size?: number }) {
  const cx = 160
  const cy = 160
  const r = 118
  // 八卦方位：南在上（传统地图方位），角=从正上方顺时针
  const guas = [
    { name: '离', elem: '火', dir: '正南', family: '中女', lines: [1, 0, 1], angle: 0 },
    { name: '坤', elem: '土', dir: '西南', family: '母亲', lines: [0, 0, 0], angle: 45 },
    { name: '兑', elem: '金', dir: '正西', family: '少女', lines: [1, 1, 0], angle: 90 },
    { name: '乾', elem: '金', dir: '西北', family: '父亲', lines: [1, 1, 1], angle: 135 },
    { name: '坎', elem: '水', dir: '正北', family: '中男', lines: [0, 1, 0], angle: 180 },
    { name: '艮', elem: '土', dir: '东北', family: '少男', lines: [0, 0, 1], angle: 225 },
    { name: '震', elem: '木', dir: '正东', family: '长男', lines: [1, 0, 0], angle: 270 },
    { name: '巽', elem: '木', dir: '东南', family: '长女', lines: [0, 1, 1], angle: 315 },
  ]
  const pt = (angle: number, rr: number) => {
    const a = ((angle - 90) * Math.PI) / 180
    return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)] as const
  }
  return (
    <svg viewBox="0 0 320 320" width={size} height={size} className="mx-auto" role="img" aria-label="后天八卦方位图">
      <circle cx={cx} cy={cy} r={r + 24} fill="none" stroke="#A8823F" strokeOpacity="0.3" strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r={r - 30} fill="none" stroke="#A8823F" strokeOpacity="0.18" strokeWidth="0.6" />
      {guas.map((g) => {
        const [x1, y1] = pt(g.angle - 22.5, r - 30)
        const [x2, y2] = pt(g.angle - 22.5, r + 24)
        return <line key={`sp-${g.name}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#A8823F" strokeOpacity="0.2" strokeWidth="0.6" />
      })}
      {guas.map((g) => {
        const [x, y] = pt(g.angle, r - 2)
        const [lx, ly] = pt(g.angle, r - 48)
        return (
          <g key={g.name}>
            {/* 迷你卦画 */}
            <g transform={`translate(${x - 13}, ${y - 11}) rotate(${g.angle}, 13, 11)`}>
              {[...g.lines].reverse().map((yang, i) =>
                yang ? (
                  <rect key={i} x="0" y={i * 8} width="26" height="3" rx="1" fill="#A8823F" />
                ) : (
                  <g key={i}>
                    <rect x="0" y={i * 8} width="11" height="3" rx="1" fill="#A8823F" />
                    <rect x="15" y={i * 8} width="11" height="3" rx="1" fill="#A8823F" />
                  </g>
                ),
              )}
            </g>
            <text x={lx} y={ly - 4} textAnchor="middle" fontSize="14" fontWeight="600" fill="#A8823F" fontFamily="'Songti SC','Noto Serif SC',serif">
              {g.name} · {g.elem}
            </text>
            <text x={lx} y={ly + 11} textAnchor="middle" fontSize="8.5" fill="#6E6555" fontFamily="'Songti SC','Noto Serif SC',serif" letterSpacing="1">
              {g.dir} · {g.family}
            </text>
          </g>
        )
      })}
      {/* 中心太极点 */}
      <circle cx={cx} cy={cy} r="3" fill="#A8823F" />
      <text x={cx} y={cy - 14} textAnchor="middle" fontSize="10" fill="#6E6555" fontFamily="'Songti SC','Noto Serif SC',serif" letterSpacing="2">
        屋之中
      </text>
    </svg>
  )
}

/** 九宫格方位图 */
export function NinePalace({ size = 300 }: { size?: number }) {
  const cells = [
    { n: 4, gua: '巽', dir: '东南', elem: '木' }, { n: 9, gua: '离', dir: '南', elem: '火' }, { n: 2, gua: '坤', dir: '西南', elem: '土' },
    { n: 3, gua: '震', dir: '东', elem: '木' }, { n: 5, gua: '中宫', dir: '中', elem: '土' }, { n: 7, gua: '兑', dir: '西', elem: '金' },
    { n: 8, gua: '艮', dir: '东北', elem: '土' }, { n: 1, gua: '坎', dir: '北', elem: '水' }, { n: 6, gua: '乾', dir: '西北', elem: '金' },
  ]
  const cs = 96
  return (
    <svg viewBox="0 0 300 312" width={size} height={size * 1.04} className="mx-auto" role="img" aria-label="九宫格方位图">
      {cells.map((c, i) => {
        const col = i % 3
        const row = Math.floor(i / 3)
        const x = 6 + col * cs
        const y = 6 + row * cs
        const isCenter = c.n === 5
        return (
          <g key={c.n}>
            <rect x={x} y={y} width={cs - 4} height={cs - 4} rx="2" fill={isCenter ? '#A8823F' : '#FFFDF7'} fillOpacity={isCenter ? 0.14 : 1} stroke="#A8823F" strokeOpacity={isCenter ? 0.55 : 0.3} strokeWidth="1" />
            <text x={x + (cs - 4) / 2} y={y + 26} textAnchor="middle" fontSize="15" fontWeight="700" fill={isCenter ? '#A8823F' : '#A8823F'} fontFamily="'Cormorant Garamond','Songti SC',serif">
              {c.n}
            </text>
            <text x={x + (cs - 4) / 2} y={y + 47} textAnchor="middle" fontSize="13" fill="#2B2620" fontFamily="'Songti SC','Noto Serif SC',serif">
              {c.gua}
            </text>
            <text x={x + (cs - 4) / 2} y={y + 66} textAnchor="middle" fontSize="9" fill="#6E6555" fontFamily="'Songti SC','Noto Serif SC',serif" letterSpacing="1">
              {c.dir} · {c.elem}
            </text>
          </g>
        )
      })}
      <text x={150} y={306} textAnchor="middle" fontSize="9.5" fill="#6E6555" fontFamily="'Songti SC','Noto Serif SC',serif" letterSpacing="2">
        上南下北 · 与户型图叠合使用
      </text>
    </svg>
  )
}
