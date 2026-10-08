import { Routes, Route } from 'react-router'
import Home from './pages/Home'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* 兜底：GitHub Pages 子路径（/xuanshu/）等任意路径都渲染首页，防止黑屏 */}
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
