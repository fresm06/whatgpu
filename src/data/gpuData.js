// GPU 유틸리티 — 스펙 데이터는 /public/data/gpus.json 에서 fetch
// 출처: TechPowerUp, PassMark, 3DMark, 다나와 기준 (2026.02)

// 브랜드 색상
export const BRAND_COLORS = {
  NVIDIA: { color: '#76B900', bg: 'rgba(118,185,0,0.1)', label: 'NVIDIA' },
  AMD:    { color: '#ED1C24', bg: 'rgba(237,28,36,0.1)', label: 'AMD' },
  Intel:  { color: '#0071C5', bg: 'rgba(0,113,197,0.1)', label: 'Intel' },
}

// 티어 정보
export const TIER_INFO = {
  S: { label: 'S', name: '플래그십', color: '#66FCF1', glow: 'rgba(102,252,241,0.35)', desc: '최고 성능. RTX 50/RX 9000 최신 세대 및 전세대 플래그십.', icon: '★' },
  A: { label: 'A', name: '하이엔드', color: '#76B900', glow: 'rgba(118,185,0,0.3)', desc: 'QHD·4K 게이밍 가능. 고성능 게이머 선택.', icon: '◆' },
  B: { label: 'B', name: '미드-하이', color: '#45A29E', glow: 'rgba(69,162,158,0.3)', desc: 'FHD 최적/QHD 가능. 현시점 가성비 구간.', icon: '▲' },
  C: { label: 'C', name: '미드레인지', color: '#9BA3AF', glow: 'rgba(155,163,175,0.2)', desc: 'FHD 게이밍 충분. 예산형 구매자 선택.', icon: '●' },
  D: { label: 'D', name: '보급형', color: '#6B7280', glow: 'rgba(107,114,128,0.15)', desc: '사무·인터넷·캐주얼 게임용. 레거시/초저가.', icon: '○' },
}

// 가성비 점수 계산 (passmark / 1만원)
export function getValueScore(gpu) {
  return ((gpu.passmark / gpu.price) * 10000).toFixed(1)
}

// 슬러그로 GPU 찾기
export function getGpuById(gpus, id) {
  return gpus.find(g => g.id === id) || null
}

// 티어별 그룹핑
export function getGpusByTier(gpus) {
  const tiers = { S: [], A: [], B: [], C: [], D: [] }
  gpus.forEach(g => tiers[g.tier].push(g))
  return tiers
}
