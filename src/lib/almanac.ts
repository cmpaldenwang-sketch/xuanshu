// ============================================================
// 玄枢 · 黄历引擎
// 输入任意 Date，输出：公历/星期、农历、四柱干支、纳音、
// 建除十二神（宜忌）、黄黑道、冲煞、彭祖百忌、胎神、时辰吉凶。
// 农历采用经典 lunarInfo 1900–2100 十六进制表。
// 已验证锚点：
//   2026-10-07 → 丙午年 丁酉月 甲寅日 / 农历八月廿七 / 青龙黄道 / 执日 / 冲猴煞北
//   2026-09-23 → 八月十三；2026-02-18 → 正月初二；2026-01-20 → 乙巳年腊月初二
//   日柱锚点 2000-01-01 = 戊午(54)；2026-10-07 = 甲寅；2026-10-23 = 庚午
// ============================================================

export const GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const
export const ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const
export const ZODIAC = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'] as const
export const WEEK_CN = ['日', '一', '二', '三', '四', '五', '六'] as const

// 天干五行
export const GAN_WUXING: Record<string, string> = {
  甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土',
  己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水',
}
export const ZHI_WUXING: Record<string, string> = {
  子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火',
  午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水',
}

const lunarInfo: number[] = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,
  0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,
  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,
  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,
  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,
  0x0d520,
]

// ---------------- 农历 ----------------

export interface LunarDate {
  year: number
  month: number
  day: number
  isLeap: boolean
  yearGanZhi: string // 农历年干支（正月初一换年，仅用于展示生肖）
  monthCn: string
  dayCn: string
  zodiac: string
}

function leapMonth(y: number): number {
  return lunarInfo[y - 1900] & 0xf
}
function leapDays(y: number): number {
  if (leapMonth(y)) return lunarInfo[y - 1900] & 0x10000 ? 30 : 29
  return 0
}
function monthDays(y: number, m: number): number {
  return (lunarInfo[y - 1900] >> (16 - m)) & 0x1 ? 30 : 29
}
function lunarYearDays(y: number): number {
  let sum = 348
  for (let i = 0x8000; i > 0x8; i >>= 1) {
    if (lunarInfo[y - 1900] & i) sum += 1
  }
  return sum + leapDays(y)
}

const MONTH_CN = ['', '正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊']

export function lunarDayCn(d: number): string {
  if (d === 10) return '初十'
  if (d === 20) return '二十'
  if (d === 30) return '三十'
  const tens = ['初', '十', '廿', '卅']
  const units = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  return tens[Math.floor((d - 1) / 10)] + units[((d - 1) % 10) + 1]
}

export function solar2lunar(date: Date): LunarDate {
  // 统一取本地正午，避免时区/DST 误差
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0)
  const base = new Date(1900, 0, 31, 12, 0, 0) // 1900 正月初一
  let offset = Math.round((d.getTime() - base.getTime()) / 86400000)
  if (offset < 0) throw new Error('仅支持 1900 年以后的日期')
  let year = 1900
  while (offset >= lunarYearDays(year)) {
    offset -= lunarYearDays(year)
    year += 1
  }
  const leap = leapMonth(year)
  let isLeap = false
  let i = 1
  let temp = 0
  while (i < 13 && offset >= 0) {
    if (leap > 0 && i === leap + 1 && !isLeap) {
      i -= 1
      isLeap = true
      temp = leapDays(year)
    } else {
      temp = monthDays(year, i)
    }
    if (isLeap && i === leap + 1) isLeap = false
    if (offset < temp) break
    offset -= temp
    i += 1
  }
  const month = i
  const day = offset + 1
  return {
    year,
    month,
    day,
    isLeap,
    yearGanZhi: gz((year - 4) % 60),
    monthCn: (isLeap ? '闰' : '') + MONTH_CN[month] + '月',
    dayCn: lunarDayCn(day),
    zodiac: ZODIAC[(year - 4) % 12],
  }
}

// ---------------- 干支 ----------------

export function gz(idx: number): string {
  const i = ((idx % 60) + 60) % 60
  return GAN[i % 10] + ZHI[i % 12]
}

const DAY_ANCHOR = new Date(2000, 0, 1, 12, 0, 0) // 2000-01-01 = 戊午日 index 54

export function dayGanZhi(date: Date): string {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0)
  const diff = Math.round((d.getTime() - DAY_ANCHOR.getTime()) / 86400000)
  return gz(54 + diff)
}

// 节气（用于年/月柱换界）。2026 年采用紫金山天文台精确时刻，其余年份用通用公式。
export interface SolarTermPoint {
  name: string
  index: number // 0..23
  time: Date
}

const TERM_NAMES = [
  '小寒', '大寒', '立春', '雨水', '惊蛰', '春分',
  '清明', '谷雨', '立夏', '小满', '芒种', '夏至',
  '小暑', '大暑', '立秋', '处暑', '白露', '秋分',
  '寒露', '霜降', '立冬', '小雪', '大雪', '冬至',
]

// 2026 年精确交节时刻（紫金山天文台，北京时间 UTC+8）
const TERMS_2026: [number, number, number, number][] = [
  [1, 5, 16, 23], [1, 20, 9, 45], [2, 4, 4, 2], [2, 18, 23, 52],
  [3, 5, 21, 59], [3, 20, 22, 46], [4, 5, 2, 40], [4, 20, 9, 39],
  [5, 5, 19, 49], [5, 21, 8, 37], [6, 5, 23, 48], [6, 21, 16, 25],
  [7, 7, 9, 57], [7, 23, 3, 13], [8, 7, 19, 43], [8, 23, 10, 19],
  [9, 7, 22, 41], [9, 23, 8, 5], [10, 8, 14, 29], [10, 23, 17, 38],
  [11, 7, 17, 52], [11, 22, 15, 23], [12, 7, 10, 53], [12, 22, 4, 50],
]

// 21 世纪通用公式 C 值（节气日 = [Y×0.2422+C] − [(Y−1)/4]）
const TERM_C = [
  6.11, 20.84, 3.87, 18.73, 5.63, 20.646,
  4.81, 20.1, 5.52, 21.04, 5.678, 21.37,
  7.108, 22.83, 7.5, 23.13, 7.646, 23.042,
  8.318, 23.438, 7.438, 22.36, 7.18, 21.94,
]
// 公式例外修正（21 世纪常见例外）
const TERM_EXCEPTIONS: Record<string, number> = {
  '2019-0': -1, '2026-0': -1, // 小寒
  '2082-1': 1, // 大寒
  '1919-2': 1, '2021-2': -1, // 立春
  '2026-3': 1, // 雨水
  '1917-7': 1, // 谷雨
  '1911-9': 1, '1984-9': -1, // 小满
  '1902-10': 1, // 芒种
  '1928-11': 1, // 夏至
  '1925-12': 1, '2016-12': -1, // 小暑
  '1922-13': 1, // 大暑
  '2002-14': 1, // 立秋
  '1930-16': 1, // 白露
  '1942-17': 1, // 秋分
  '2089-19': 1, // 霜降
  '2089-20': 1, // 立冬
  '1978-21': 1, // 小雪
  '1954-22': 1, // 大雪
  '1918-23': -1, '2021-23': -1, // 冬至
}

export function solarTermsOfYear(year: number): SolarTermPoint[] {
  if (year === 2026) {
    return TERMS_2026.map(([m, d, h, min], i) => ({
      name: TERM_NAMES[i],
      index: i,
      time: new Date(Date.UTC(2026, m - 1, d, h - 8, min)), // 北京时间 → UTC
    }))
  }
  const Y = year % 100
  return TERM_NAMES.map((name, i) => {
    let day = Math.floor(Y * 0.2422 + TERM_C[i]) - Math.floor((Y - 1) / 4)
    const key = `${year}-${i}`
    if (TERM_EXCEPTIONS[key]) day += TERM_EXCEPTIONS[key]
    // 节气所在的公历月份：小寒=1月 大寒=1月 立春=2月 ... 冬至=12月
    const month = Math.floor(i / 2) + 1
    // 近似到正午，仅用于年/月柱换界兜底
    return { name, index: i, time: new Date(Date.UTC(year, month - 1, day, 4, 0)) }
  })
}

/** 年柱：以立春换年 */
export function yearGanZhi(date: Date): string {
  const y = date.getFullYear()
  const lichun = solarTermsOfYear(y)[2].time // 立春
  const year = date.getTime() >= lichun.getTime() ? y : y - 1
  return gz((year - 4) % 60)
}

/**
 * 月柱：以节气换月（节换月），五虎遁起月。
 * 节（非中气）顺序：立春(寅) 惊蛰(卯) 清明(辰) 立夏(巳) 芒种(午) 小暑(未)
 *                  立秋(申) 白露(酉) 寒露(戌) 立冬(亥) 大雪(子) 小寒(丑)
 */
export function monthGanZhi(date: Date): string {
  const y = date.getFullYear()
  // 取前后两年的节气，保证一月小寒边界正确
  const terms = [...solarTermsOfYear(y - 1), ...solarTermsOfYear(y), ...solarTermsOfYear(y + 1)]
  const jieIdx = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 0] // 对应 寅..丑
  const jiePoints = terms
    .filter((t) => jieIdx.includes(t.index))
    .sort((a, b) => a.time.getTime() - b.time.getTime())
  // 找到最近一个已过的节
  let current: SolarTermPoint | null = null
  for (const p of jiePoints) {
    if (p.time.getTime() <= date.getTime()) current = p
    else break
  }
  if (!current) current = jiePoints[0]
  // 月支：立春→寅(2)，惊蛰→卯(3)……小寒→丑(1)
  const branchMap: Record<number, number> = { 2: 2, 4: 3, 6: 4, 8: 5, 10: 6, 12: 7, 14: 8, 16: 9, 18: 10, 20: 11, 22: 0, 0: 1 }
  const monthBranch = branchMap[current.index]
  // 年干（以立春换年）
  const gzYear = yearGanZhi(date)
  const yearStem = GAN.indexOf(gzYear[0] as (typeof GAN)[number])
  // 五虎遁：甲己之年丙作首，乙庚之岁戊为头，丙辛必定寻庚起，丁壬壬位顺行流，戊癸何方发，甲寅之上好追求
  const firstMonthStem = [2, 4, 6, 8, 0][yearStem % 5] // 寅月天干
  // 寅月 branch=2 → stem = firstMonthStem；每月推进
  const offset = (monthBranch - 2 + 12) % 12
  const stem = (firstMonthStem + offset) % 10
  return GAN[stem] + ZHI[monthBranch]
}

// ---------------- 纳音 ----------------

const NAYIN = [
  '海中金', '炉中火', '大林木', '路旁土', '剑锋金', '山头火',
  '涧下水', '城头土', '白蜡金', '杨柳木', '泉中水', '屋上土',
  '霹雳火', '松柏木', '长流水', '沙中金', '山下火', '平地木',
  '壁上土', '金箔金', '覆灯火', '天河水', '大驿土', '钗钏金',
  '桑柘木', '大溪水', '沙中土', '天上火', '石榴木', '大海水',
]

export function nayin(ganzhi: string): string {
  const stem = GAN.indexOf(ganzhi[0] as (typeof GAN)[number])
  const branch = ZHI.indexOf(ganzhi[1] as (typeof ZHI)[number])
  // 找六十甲子序号
  for (let i = 0; i < 60; i++) {
    if (i % 10 === stem && i % 12 === branch) return NAYIN[Math.floor(i / 2)]
  }
  return ''
}

// ---------------- 建除十二神 ----------------

export interface JianChu {
  name: string
  yi: string[]
  ji: string[]
  note: string
}

const JIANCHU_ORDER = ['建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭']

const JIANCHU_TABLE: Record<string, { yi: string[]; ji: string[]; note: string }> = {
  建: { yi: ['出行', '赴任', '谒贵', '上书', '会亲友', '求职'], ji: ['动土', '开仓', '乘船', '修仓'], note: '建者，健也。万物生育，宜建立根基之事。' },
  除: { yi: ['沐浴', '扫除', '求医', '疗病', '解除', '整手足甲'], ji: ['嫁娶', '开业', '求官', '上任'], note: '除者，去旧也。宜除旧布新、扫除恶秽。' },
  满: { yi: ['祭祀', '祈福', '嫁娶', '开市', '交易', '纳财', '结亲'], ji: ['服药', '栽种', '下葬', '赴任'], note: '满者，丰也。宜圆满丰足之事，忌损泄。' },
  平: { yi: ['修饰垣墙', '平治道涂', '祭祀', '会友', '习艺'], ji: ['词讼', '出行', '嫁娶', '开渠'], note: '平者，常也。宜修治平常之事，万事求稳。' },
  定: { yi: ['冠带', '嫁娶', '纳采', '修造', '安床', '签约'], ji: ['词讼', '出行', '移徙', '开市'], note: '定者，成也。宜安定议定之事，忌争讼奔波。' },
  执: { yi: ['捕捉', '祭祀', '祈福', '守成', '畋猎', '收账'], ji: ['移徙', '出行', '开市', '嫁娶'], note: '执者，守也。宜守成执固，忌更张变动。' },
  破: { yi: ['破屋', '坏垣', '求医', '拆除', '疗病'], ji: ['嫁娶', '开市', '动土', '签约', '诸事不宜轻举'], note: '破者，耗也。仅宜破除之事，余事勿取。' },
  危: { yi: ['祭祀', '祈福', '畋猎', '纳畜', '安床'], ji: ['登高', '行船', '冒险', '嫁娶'], note: '危者，高也。高处有险，宜低回守静。' },
  成: { yi: ['嫁娶', '开市', '立券', '交易', '入学', '纳财', '出行'], ji: ['词讼', '争执'], note: '成者，就也。万物成就，百事皆吉。' },
  收: { yi: ['纳财', '收账', '捕捉', '纳畜', '收藏', '进货'], ji: ['安葬', '出行', '放债', '求医'], note: '收者，敛也。宜收敛收纳，忌放出施与。' },
  开: { yi: ['开市', '嫁娶', '出行', '入学', '动土', '开业', '上梁'], ji: ['下葬', '放债', '诉讼'], note: '开者，启也。宜开启通达之事，生气勃勃。' },
  闭: { yi: ['筑堤', '补垣', '塞穴', '安葬', '祭祀'], ji: ['开市', '出行', '嫁娶', '求医'], note: '闭者，塞也。宜闭藏修筑，忌开张远行。' },
}

/** 建除十二神：按月支起建，日支顺推 */
export function jianChu(monthGz: string, dayGz: string): JianChu {
  const mBranch = ZHI.indexOf(monthGz[1] as (typeof ZHI)[number])
  const dBranch = ZHI.indexOf(dayGz[1] as (typeof ZHI)[number])
  const idx = (dBranch - mBranch + 12) % 12
  const name = JIANCHU_ORDER[idx]
  return { name, ...JIANCHU_TABLE[name] }
}

// ---------------- 黄黑道十二神 ----------------

export const HUANGHEI_GODS = [
  '青龙', '明堂', '天刑', '朱雀', '金匮', '天德',
  '白虎', '玉堂', '天牢', '玄武', '司命', '勾陈',
] as const

const AUSPICIOUS_GODS = new Set(['青龙', '明堂', '金匮', '天德', '玉堂', '司命'])

export const GOD_BRIEF: Record<string, string> = {
  青龙: '天乙天贵之神，所值之日，贵人相助，诸事呈祥。',
  明堂: '贵人星、明辅星所值，利见大人，宜谋大事。',
  天刑: '天刑星值日，利于出师征战，余事多防刑伤。',
  朱雀: '朱雀乃口舌之星，所值之日慎防是非文书。',
  金匮: '福德星、月仙星所值，利签约纳财、文书大吉。',
  天德: '天德星值日，天之福德所在，化凶为吉。',
  白虎: '天杀星所值，宜谨慎行事，防血光车马之险。',
  玉堂: '天开星所值，文昌贵人临之，宜文书喜庆之事。',
  天牢: '镇神星所值，阴人用事则吉，余多束缚。',
  玄武: '天狱星所值，君子用之吉，小人防失脱暗昧。',
  司命: '凤辇星、月仙星所值，白昼用事大吉，利祈福。',
  勾陈: '地狱星所值，所作之事有始无终，先喜后悲。',
}

/** 起青龙规则：寅申月起子日、卯酉月起寅日、辰戌月起辰日、巳亥月起午日、子午月起申日、丑未月起戌日 */
export function qinglongStartBranch(monthBranch: number): number {
  if (monthBranch === 2 || monthBranch === 8) return 0 // 寅申 → 子
  if (monthBranch === 3 || monthBranch === 9) return 2 // 卯酉 → 寅
  if (monthBranch === 4 || monthBranch === 10) return 4 // 辰戌 → 辰
  if (monthBranch === 5 || monthBranch === 11) return 6 // 巳亥 → 午
  if (monthBranch === 6 || monthBranch === 0) return 8 // 子午 → 申
  return 10 // 丑未 → 戌
}

export interface DayGod {
  god: string
  isAuspicious: boolean // 黄道吉日
  brief: string
}

export function dayGod(monthGz: string, dayGz: string): DayGod {
  const mBranch = ZHI.indexOf(monthGz[1] as (typeof ZHI)[number])
  const dBranch = ZHI.indexOf(dayGz[1] as (typeof ZHI)[number])
  const start = qinglongStartBranch(mBranch)
  const idx = (dBranch - start + 12) % 12
  const god = HUANGHEI_GODS[idx]
  return { god, isAuspicious: AUSPICIOUS_GODS.has(god), brief: GOD_BRIEF[god] }
}

// ---------------- 冲煞 ----------------

/** 日支相冲生肖 + 煞方。煞方：寅午戌日煞北，申子辰日煞南，巳酉丑日煞东，亥卯未日煞西 */
export function chongSha(dayGz: string): { chong: string; zodiac: string; sha: string; text: string } {
  const dBranch = ZHI.indexOf(dayGz[1] as (typeof ZHI)[number])
  const chongBranch = (dBranch + 6) % 12
  const shaMap: Record<number, string> = {}
  ;[2, 6, 10].forEach((b) => (shaMap[b] = '北'))
  ;[8, 0, 4].forEach((b) => (shaMap[b] = '南'))
  ;[5, 9, 1].forEach((b) => (shaMap[b] = '东'))
  ;[11, 3, 7].forEach((b) => (shaMap[b] = '西'))
  const sha = shaMap[dBranch]
  return {
    chong: ZHI[chongBranch],
    zodiac: ZODIAC[chongBranch],
    sha,
    text: `冲${ZODIAC[chongBranch]}（${ZHI[chongBranch]}）煞${sha}`,
  }
}

// ---------------- 彭祖百忌 ----------------

const PENGZU_GAN: Record<string, string> = {
  甲: '甲不开仓，财物耗散', 乙: '乙不栽植，千株不长', 丙: '丙不修灶，必见灾殃',
  丁: '丁不剃头，头必生疮', 戊: '戊不受田，田主不祥', 己: '己不破券，二比并亡',
  庚: '庚不经络，织机虚张', 辛: '辛不合酱，主人不尝', 壬: '壬不泱水，更难提防',
  癸: '癸不词讼，理弱敌强',
}
const PENGZU_ZHI: Record<string, string> = {
  子: '子不问卜，自惹祸殃', 丑: '丑不冠带，主不还乡', 寅: '寅不祭祀，神鬼不尝',
  卯: '卯不穿井，水泉不香', 辰: '辰不哭泣，必主重丧', 巳: '巳不远行，财物伏藏',
  午: '午不苫盖，屋主更张', 未: '未不服药，毒气入肠', 申: '申不安床，鬼祟入房',
  酉: '酉不会客，醉坐颠狂', 戌: '戌不吃犬，作怪上床', 亥: '亥不嫁娶，不利新郎',
}

// ---------------- 胎神方位（按日干口诀） ----------------

const TAISHEN: Record<string, { place: string; direction: string }> = {
  甲: { place: '占门炉', direction: '外东北' },
  乙: { place: '碓磨厕', direction: '外东南' },
  丙: { place: '厨灶栖', direction: '外正南' },
  丁: { place: '仓库门', direction: '外正南' },
  戊: { place: '房床栖', direction: '外中庭' },
  己: { place: '占门床', direction: '外中庭' },
  庚: { place: '碓磨炉', direction: '外正西' },
  辛: { place: '厨灶门', direction: '外正西' },
  壬: { place: '仓库炉', direction: '外正北' },
  癸: { place: '房床厕', direction: '外正北' },
}

// ---------------- 十二时辰吉凶 ----------------

export interface HourFortune {
  zhi: string
  timeRange: string
  god: string
  isAuspicious: boolean
}

export function hourFortunes(dayGz: string): HourFortune[] {
  const dBranch = ZHI.indexOf(dayGz[1] as (typeof ZHI)[number])
  const start = qinglongStartBranch(dBranch) // 时辰黄黑道按日支起青龙
  return ZHI.map((zhi, h) => {
    const god = HUANGHEI_GODS[(h - start + 12) % 12]
    const startHour = (h * 2 + 23) % 24
    const endHour = (h * 2 + 1) % 24
    const fmt = (n: number) => String(n).padStart(2, '0')
    return {
      zhi,
      timeRange: `${fmt(startHour)}:00–${fmt(endHour)}:00`,
      god,
      isAuspicious: AUSPICIOUS_GODS.has(god),
    }
  })
}

// ---------------- 汇总 ----------------

export interface Almanac {
  solar: { year: number; month: number; day: number; week: string }
  lunar: LunarDate
  yearGz: string
  monthGz: string
  dayGz: string
  yearNayin: string
  monthNayin: string
  dayNayin: string
  jianChu: JianChu
  dayGod: DayGod
  chongSha: string
  pengZu: [string, string]
  taiShen: string
  hours: HourFortune[]
}

export function getAlmanac(date: Date): Almanac {
  const lunar = solar2lunar(date)
  const yGz = yearGanZhi(date)
  const mGz = monthGanZhi(date)
  const dGz = dayGanZhi(date)
  const jc = jianChu(mGz, dGz)
  const dg = dayGod(mGz, dGz)
  const cs = chongSha(dGz)
  const ts = TAISHEN[dGz[0]]
  return {
    solar: {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      week: WEEK_CN[date.getDay()],
    },
    lunar,
    yearGz: yGz,
    monthGz: mGz,
    dayGz: dGz,
    yearNayin: nayin(yGz),
    monthNayin: nayin(mGz),
    dayNayin: nayin(dGz),
    jianChu: jc,
    dayGod: dg,
    chongSha: cs.text,
    pengZu: [PENGZU_GAN[dGz[0]], PENGZU_ZHI[dGz[1]]],
    taiShen: `${ts.place} ${ts.direction}`,
    hours: hourFortunes(dGz),
  }
}

/** 今日总评一句话（供 Hero 使用） */
export function dailyVerdict(a: Almanac): string {
  const dao = a.dayGod.isAuspicious ? `${a.dayGod.god}黄道` : `${a.dayGod.god}黑道`
  const mood = a.dayGod.isAuspicious
    ? ['宜谋定而动', '宜守正出新', '宜从容行事', '宜修身积福'][a.solar.day % 4]
    : ['宜守不宜攻', '宜静不宜动', '宜退一步海阔天空', '宜收敛锋芒'][a.solar.day % 4]
  return `${dao} · ${a.jianChu.name}日 · ${a.jianChu.name === '执' ? '宜守成' : mood}`
}
