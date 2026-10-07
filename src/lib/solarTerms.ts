// ============================================================
// 玄枢 · 二十四节气
// 2026 年交节时刻采用紫金山天文台发布（北京时间），
// 其余年份用 21 世纪通用公式兜底（见 almanac.solarTermsOfYear）。
// ============================================================

import { solarTermsOfYear, type SolarTermPoint } from './almanac'

export interface SolarTermInfo {
  name: string
  index: number
  longitude: number // 太阳黄经
  sanshou: [string, string, string] // 三候
  intro: string // 背景介绍
  astronomy: string // 与地球公转的关系
}

export const TERM_INFO: SolarTermInfo[] = [
  { name: '小寒', index: 0, longitude: 285, sanshou: ['雁北乡', '鹊始巢', '雉始雊'], intro: '小寒是冬季的第五个节气，冷气积久而寒，却尚未到极点。此时旧岁近暮，新岁将启，民间开始忙着写春联、备年货。', astronomy: '太阳黄经 285°，直射点仍在南半球缓缓北归。北半球白昼虽已开始变长，但地表热量收支仍是入不敷出，故寒意最深处往往不在冬至，而在小寒大寒。' },
  { name: '大寒', index: 1, longitude: 300, sanshou: ['鸡乳', '征鸟厉疾', '水泽腹坚'], intro: '大寒为二十四节气之末，寒气之逆极，坚冰深处春水生。过了大寒，又将迎来新一年的节气轮回。', astronomy: '太阳黄经 300°。此时北半球获得的热量仍少，河湖结冰直达水底。但物极必反——鸡始乳、征鸟厉疾，阳气已在坚冰之下萌动。' },
  { name: '立春', index: 2, longitude: 315, sanshou: ['东风解冻', '蛰虫始振', '鱼陟负冰'], intro: '立春，四时之始也。东风送暖，大地解冻，万物含苞。古人以立春为岁首，干支纪年即以此换年。', astronomy: '太阳黄经 315°。从这一刻起，北半球昼夜长短的拐点效应开始显现：白昼明显变长，正午太阳升高，地面接收的热量开始超过散失，春回大地有了天文学的依据。' },
  { name: '雨水', index: 3, longitude: 330, sanshou: ['獭祭鱼', '鸿雁来', '草木萌动'], intro: '东风既解冻，则散而为雨矣。雨水时节，降水渐多，鸿雁北归，草木随地中阳气的上腾而开始抽出嫩芽。', astronomy: '太阳黄经 330°，直射点继续北移，海洋与陆地的温差变化使暖湿气流开始活跃，降水形式由雪渐转为雨。' },
  { name: '惊蛰', index: 4, longitude: 345, sanshou: ['桃始华', '仓庚鸣', '鹰化为鸠'], intro: '春雷乍动，惊醒蛰伏于土中的百虫。惊蛰是唯一以动物物候命名的节气，自此田家开始春耕。', astronomy: '太阳黄经 345°。北半球升温加快，冷暖空气频繁交锋，雷电始作——那一声春雷，正是大气能量重新分配的信号。' },
  { name: '春分', index: 5, longitude: 0, sanshou: ['玄鸟至', '雷乃发声', '始电'], intro: '春分者，阴阳相半也，故昼夜均而寒暑平。燕子北归，百花争艳，是一年中阴阳平衡的两个瞬间之一。', astronomy: '太阳黄经 0°，直射点自南向北越过赤道，全球昼夜平分。此后北半球昼渐长、夜渐短，天文学意义上的春季正式展开。' },
  { name: '清明', index: 6, longitude: 15, sanshou: ['桐始华', '田鼠化为鴽', '虹始见'], intro: '万物生长此时，皆清洁而明净，故谓之清明。既是节气又是节日，扫墓祭祖与踏青郊游并行不悖。', astronomy: '太阳黄经 15°。直射点深入北半球，雨量增多，空气澄澈，雨后初霁常见彩虹——那是阳光在雨滴中的折射与回归。' },
  { name: '谷雨', index: 7, longitude: 30, sanshou: ['萍始生', '鸣鸠拂其羽', '戴胜降于桑'], intro: '雨生百谷，故曰谷雨。这是春季最后一个节气，浮萍始生，布谷催耕，桑叶青青待蚕眠。', astronomy: '太阳黄经 30°。北半球热量充裕，冷暖空气在长江流域频繁交汇，丰沛的雨水正是谷物生长最需要的给养。' },
  { name: '立夏', index: 8, longitude: 45, sanshou: ['蝼蝈鸣', '蚯蚓出', '王瓜生'], intro: '斗指东南，维为立夏，万物至此皆长大。蛙声渐起，蚯蚓掘土，王瓜的蔓藤开始快速攀爬。', astronomy: '太阳黄经 45°。北半球白昼显著变长，正午太阳高度持续增大，地表积蓄的热量推动万物进入旺盛生长期。' },
  { name: '小满', index: 9, longitude: 60, sanshou: ['苦菜秀', '靡草死', '麦秋至'], intro: '四月中，小满者，物至于此小得盈满。麦粒渐满而未全熟——小满是一种将满未满的智慧，满而不溢。', astronomy: '太阳黄经 60°。北方麦类籽粒开始灌浆饱满，南方则进入江河渐满的汛期，全国大部地区相继入夏。' },
  { name: '芒种', index: 10, longitude: 75, sanshou: ['螳螂生', '鵙始鸣', '反舌无声'], intro: '有芒之谷可种，故曰芒种。这是农事最繁忙的节气：收麦、插秧、种豆，一刻不得闲。', astronomy: '太阳黄经 75°，直射点逼近北回归线。长江中下游进入梅雨季节，湿热交蒸，正宜有芒作物抢时播种。' },
  { name: '夏至', index: 11, longitude: 90, sanshou: ['鹿角解', '蜩始鸣', '半夏生'], intro: '日长之至，日影短至，故曰夏至。这是北半球白昼最长的一天，阳极之至，阴气始生。', astronomy: '太阳黄经 90°，直射点抵达北回归线（北纬 23.5°）——这是它一年中最北的位置。北半球正午太阳最高、白昼最长；此后直射点掉头南归，盛夏正式登场。四季轮回的枢机，正在这一次次南北往返之间。' },
  { name: '小暑', index: 12, longitude: 105, sanshou: ['温风至', '蟋蟀居壁', '鹰始击'], intro: '暑，热也；小暑为小热，大地上不再有一丝凉风，所有的风都带着热浪。蟋蟀离开田野，躲到庭院的墙角下避暑。', astronomy: '太阳黄经 105°。直射点虽已南移，但地表热量仍在累积，如同炉火烧到最旺需要延时——一年中最热的时段即将到来。' },
  { name: '大暑', index: 13, longitude: 120, sanshou: ['腐草为萤', '土润溽暑', '大雨时行'], intro: '大暑，六月中，炎热之极也。萤火虫从腐草中飞出，土地潮湿，雷雨时行，湿热交蒸到达顶点。', astronomy: '太阳黄经 120°。地表累积的热量达到峰值，是一年中最热的节气；充沛的热量与水汽也酝酿着频繁的雷阵雨。' },
  { name: '立秋', index: 14, longitude: 135, sanshou: ['凉风至', '白露降', '寒蝉鸣'], intro: '立秋，七月节，秋，揫也，物于此而揫敛。凉风有信，一叶知秋，但暑气并未立刻退场——还有秋老虎。', astronomy: '太阳黄经 135°。直射点继续南退，北半球白昼缩短的趋势开始可感，早晚渐凉，但地表积热未尽，暑热余威犹在。' },
  { name: '处暑', index: 15, longitude: 150, sanshou: ['鹰乃祭鸟', '天地始肃', '禾乃登'], intro: '处，止也，暑气至此而止矣。鹰隼开始捕猎，天地渐有肃杀之气，五谷丰登在望。', astronomy: '太阳黄经 150°。副热带高压南撤，冷空气开始试探性南下，昼夜温差拉大——昼热夜凉，正是谷物灌浆成熟的黄金条件。' },
  { name: '白露', index: 16, longitude: 165, sanshou: ['鸿雁来', '玄鸟归', '群鸟养羞'], intro: '阴气渐重，露凝而白也。鸿雁南来，燕子南归，群鸟开始储藏过冬的食物。', astronomy: '太阳黄经 165°。夜间辐射降温明显，近地面的水汽在草木上凝结成白色露珠——那是秋天写在大地上的标点。' },
  { name: '秋分', index: 17, longitude: 180, sanshou: ['雷始收声', '蛰虫坯户', '水始涸'], intro: '秋分者，阴阳相半也，故昼夜均而寒暑平。这一天，太阳几乎直射赤道，全球昼夜等长。雷声自春分而起，至秋分而收；蛰虫开始用细土封塞洞口，准备蛰伏；雨量减少，沼泽水洼渐渐干涸。秋分之后，北半球一天短过一天，深秋与冬的序幕就此拉开。今年的秋分交节于 9 月 23 日 08:05，而下一个节气寒露，将在 10 月 8 日 14:29 到来——鸿雁来宾，菊有黄华，秋意将更进一层。', astronomy: '秋分日太阳黄经恰为 180°，直射点自北向南越过赤道，全球昼夜平分，各得十二小时。这是地球公转轨道上两个「平衡点」之一（另一个是春分）。此后直射点移向南半球，北半球昼短夜长，正午太阳高度逐日降低，地面接收的热量开始少于散失，气温便一路下行。我们感受到的四季更替，本质上是地球自转轴倾斜 23.5° 后绕日公转的结果：不是地球离太阳远了才冷，而是阳光的入射角与日照时长改变了。秋分，正是这场宏大倾角之舞的中场哨音。' },
  { name: '寒露', index: 18, longitude: 195, sanshou: ['鸿雁来宾', '雀入大水为蛤', '菊有黄华'], intro: '露气寒冷，将凝结也。鸿雁排成人字大举南迁，菊花凌霜而开，深秋的凉意里有了第一丝冬的消息。', astronomy: '太阳黄经 195°。直射点在南半球继续南行，北半球昼短夜长的格局确立，冷空气开始频繁南下，露水更凉，几欲成霜。' },
  { name: '霜降', index: 19, longitude: 210, sanshou: ['豺乃祭兽', '草木黄落', '蛰虫咸俯'], intro: '气肃而凝，露结为霜。豺狼捕猎陈列如祭，草木摇落，蛰虫垂头进入冬眠——秋季的最后一个节气。', astronomy: '太阳黄经 210°。夜间地表辐射降温剧烈，近地面气温可降至冰点，水汽直接凝华为霜。霜不是从天而降，而是大地自身的凝结。' },
  { name: '立冬', index: 20, longitude: 225, sanshou: ['水始冰', '地始冻', '雉入大水为蜃'], intro: '立，建始也；冬，终也，万物收藏也。水面开始结冰，土地开始封冻，万物进入休养收藏的状态。', astronomy: '太阳黄经 225°。直射点深入南半球，北半球正午太阳高度明显降低，白昼短促，冬季自此开始在天文学上展开。' },
  { name: '小雪', index: 21, longitude: 240, sanshou: ['虹藏不见', '天气上升地气下降', '闭塞而成冬'], intro: '虹藏不见，天地不交，闭塞成冬。初雪将至而未盛，故为小雪——此时腌菜、晒鱼干，正是时候。', astronomy: '太阳黄经 240°。冷空气活动频繁，降水形态由雨转雪，但雪量尚小。天地之气不再交通，万物进入闭藏。' },
  { name: '大雪', index: 22, longitude: 255, sanshou: ['鹖鴠不鸣', '虎始交', '荔挺出'], intro: '大者，盛也，至此而雪盛矣。寒号鸟不再鸣叫，阳气萌动处，老虎开始求偶，兰草抽出新芽。', astronomy: '太阳黄经 255°。北半球获得的太阳辐射继续减少，雪日多、雪量大。但阴气最盛之时，阳气已在深处悄然萌动。' },
  { name: '冬至', index: 23, longitude: 270, sanshou: ['蚯蚓结', '麋角解', '水泉动'], intro: '日短之至，日影长至，故曰冬至。这是北半球白昼最短的一天，阴极之至，阳气始生——冬至一阳生，古人视之为大吉之日。', astronomy: '太阳黄经 270°，直射点抵达南回归线（南纬 23.5°），一年中最南的位置。北半球白昼最短、黑夜最长；此后直射点掉头北上，白昼将一天天变长。所谓「冬至一阳生」，正是对这一天文学拐点的古老表达。' },
]

export interface CurrentTermState {
  current: SolarTermPoint
  next: SolarTermPoint
  info: SolarTermInfo
  nextInfo: SolarTermInfo
  /** 距下一节气 */
  countdown: { days: number; hours: number; minutes: number }
  /** 当前黄经（按时间线性插值） */
  longitudeNow: number
  /** 处于本节气的第几候（0/1/2） */
  houIndex: number
  progress: number // 0..1 本节气进度
}

export function getCurrentTerm(date: Date): CurrentTermState {
  const y = date.getFullYear()
  const terms = [...solarTermsOfYear(y - 1), ...solarTermsOfYear(y), ...solarTermsOfYear(y + 1)].sort(
    (a, b) => a.time.getTime() - b.time.getTime(),
  )
  // 按北京时间日历日判定当前节气（交节日当日即视为进入该节气），
  // 交节精确时刻仍用于倒计时展示。
  const bjDay = (t: number) => Math.floor((t + 8 * 3600000) / 86400000)
  const today = bjDay(date.getTime())
  let ci = 0
  for (let i = 0; i < terms.length; i++) {
    if (bjDay(terms[i].time.getTime()) <= today) ci = i
    else break
  }
  const current = terms[ci]
  const next = terms[ci + 1]
  const info = TERM_INFO[current.index]
  const nextInfo = TERM_INFO[next.index]
  const msLeft = Math.max(0, next.time.getTime() - date.getTime())
  const days = Math.floor(msLeft / 86400000)
  const hours = Math.floor((msLeft % 86400000) / 3600000)
  const minutes = Math.floor((msLeft % 3600000) / 60000)
  const span = next.time.getTime() - current.time.getTime()
  const progress = Math.min(1, Math.max(0, (date.getTime() - current.time.getTime()) / span))
  const lonSpan = (nextInfo.longitude - info.longitude + 360) % 360 || 360
  const longitudeNow = (info.longitude + lonSpan * progress) % 360
  const houIndex = Math.min(2, Math.floor(progress * 3))
  return { current, next, info, nextInfo, countdown: { days, hours, minutes }, longitudeNow, houIndex, progress }
}
