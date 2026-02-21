import { useState } from 'react'
import { createPortal } from 'react-dom'
import { TIER_INFO, BRAND_COLORS, getGpusByTier, getValueScore } from '../data/gpuData'
import './TierTable.css'

const TIER_ORDER = ['S', 'A', 'B', 'C', 'D']

export default function TierTable({ gpus, onNavigate }) {
  const [filter, setFilter] = useState('ALL')
  const [selected, setSelected] = useState(null)
  const gpusByTier = getGpusByTier(gpus)

  const BRANDS = ['ALL', 'NVIDIA', 'AMD', 'Intel']

  const filtered = (tier) =>
    gpusByTier[tier].filter(g => filter === 'ALL' || g.brand === filter)

  const openDetail = (gpu) => setSelected(gpu)
  const closeDetail = () => setSelected(null)

  return (
    <section className="tier-page">
      {/* 헤더 */}
      <div className="tier-hero">
        <h1 className="tier-h1">
          <span className="tier-h1-line">GPU</span>
          <span className="tier-h1-main neon">계급도</span>
          <span className="tier-h1-sub">2026 최신 그래픽카드 성능 티어표 (RTX 50·RX 9000 포함)</span>
        </h1>
        <p className="tier-desc">
          PassMark 벤치마크 기준으로 {gpus.length}종의 그래픽카드를 S~D 5단계로 분류했습니다.
          RTX 50·40·30 시리즈, RX 9000·7000·6000 시리즈, Intel Arc를 한눈에 비교하세요.
        </p>

        {/* 브랜드 필터 */}
        <div className="tier-filters">
          {BRANDS.map(b => (
            <button
              key={b}
              className={`tier-filter${filter === b ? ' tier-filter--on' : ''}`}
              style={filter === b && b !== 'ALL' ? {
                color: BRAND_COLORS[b]?.color,
                borderColor: BRAND_COLORS[b]?.color,
                background: BRAND_COLORS[b]?.bg,
              } : {}}
              onClick={() => setFilter(b)}
            >
              {b === 'ALL' ? '전체' : b}
            </button>
          ))}
        </div>
      </div>

      {/* 티어 행 */}
      <div className="tier-list">
        {TIER_ORDER.map(tier => {
          const gpuList = filtered(tier)
          if (!gpuList.length) return null
          const info = TIER_INFO[tier]
          return (
            <div key={tier} className={`tier-row tier-row--${tier.toLowerCase()}`}>
              {/* 티어 뱃지 */}
              <div className="tier-badge" style={{ color: info.color, boxShadow: `0 0 20px ${info.glow}, inset 0 0 20px rgba(0,0,0,0.5)`, borderColor: info.color }}>
                <span className="tier-badge-ic">{info.icon}</span>
                <span className="tier-badge-label">{info.label}</span>
                <span className="tier-badge-name">{info.name}</span>
              </div>

              {/* GPU 카드 그리드 */}
              <div className="tier-cards">
                {gpuList.map((gpu, i) => (
                  <button
                    key={gpu.id}
                    className="gpu-card"
                    onClick={() => openDetail(gpu)}
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <span
                      className="gpu-brand"
                      style={{ color: BRAND_COLORS[gpu.brand].color, background: BRAND_COLORS[gpu.brand].bg }}
                    >
                      {gpu.brand}
                    </span>
                    <span className="gpu-name">{gpu.shortName}</span>
                    <div className="gpu-stats">
                      <span className="gpu-stat">
                        <span className="gs-label">VRAM</span>
                        <span className="gs-val mono">{gpu.vram}GB</span>
                      </span>
                      <span className="gpu-stat">
                        <span className="gs-label">TDP</span>
                        <span className="gs-val mono">{gpu.tdp}W</span>
                      </span>
                      <span className="gpu-stat">
                        <span className="gs-label">PM</span>
                        <span className="gs-val mono">{gpu.passmark.toLocaleString()}</span>
                      </span>
                    </div>
                    <div className="gpu-price">
                      ₩{(gpu.price / 10000).toFixed(0)}만
                    </div>
                  </button>
                ))}
              </div>

              {/* 티어 설명 */}
              <p className="tier-row-desc">{info.desc}</p>
            </div>
          )
        })}
      </div>

      {/* 본문 콘텐츠 */}
      <div className="tier-article">
        <h2 className="ta-h2">2026년 그래픽카드 티어표 — 완벽 해설</h2>
        <p className="ta-p">
          그래픽카드 구매는 예산과 목적에 따라 최적의 선택이 달라집니다. 본 티어표는 PassMark CPU 벤치마크 데이터베이스의
          GPU 점수를 기준으로, 실제 게이밍 성능과 크리에이터 워크로드를 종합적으로 반영하여 S·A·B·C·D 5개 등급으로 분류하였습니다.
        </p>
        <h3 className="ta-h3">S티어 — RTX 50·RX 9000 최신 세대 및 플래그십</h3>
        <p className="ta-p">
          S티어에는 2025년 출시된 NVIDIA Blackwell(RTX 5090/5080/5070 Ti) 및 AMD RDNA 4(RX 9070 XT) 최신 GPU와
          전세대 플래그십이 포함됩니다. RTX 5090은 PassMark 43,500점으로 압도적인 1위를 기록하며, 32GB GDDR7 메모리와
          DLSS 4 Multi Frame Generation을 지원합니다. RX 9070 XT는 RTX 4080 Super와 유사한 성능을 더 저렴한 가격에 제공합니다.
        </p>
        <h3 className="ta-h3">A티어 — QHD·4K 게이밍의 현실적인 선택</h3>
        <p className="ta-p">
          A티어는 RTX 5070, RX 9070 등 2025년 신제품과 RTX 4070 Super, RX 7800 XT 등 검증된 고성능 GPU들이 포진해 있습니다.
          QHD(2560x1440)에서 100fps 이상을 안정적으로 유지하고 4K에서도 60fps 이상을 낼 수 있어, 고해상도 모니터 사용자에게 적합합니다.
        </p>
        <h3 className="ta-h3">B티어 — FHD 종결·QHD 입문 최적의 가성비 구간</h3>
        <p className="ta-p">
          현시점에서 가장 많은 분들에게 추천드리는 구간입니다. RTX 4060 Ti, RX 7700 XT, Arc B580 등이 여기에 속하며,
          FHD(1920x1080) 해상도에서 144fps 이상을 안정적으로 유지하고 QHD에서도 60~100fps를 넘나듭니다.
          40~50만원대의 합리적인 가격에 최신 기능(DLSS 3, FSR 3, XeSS)까지 지원하는 제품이 많습니다.
        </p>
        <div className="ta-cta">
          <span className="ta-cta-txt">두 그래픽카드를 직접 비교해보고 싶다면?</span>
          <button className="ta-cta-btn" onClick={() => onNavigate('compare')}>
            맞짱 비교 바로 가기 →
          </button>
        </div>
      </div>

      {/* GPU 상세 모달 — Portal로 body에 직접 렌더링 */}
      {selected && createPortal(
        <div className="modal-bg" onClick={closeDetail}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeDetail}>✕</button>

            <div className="modal-head">
              <span
                className="modal-brand"
                style={{ color: BRAND_COLORS[selected.brand].color, background: BRAND_COLORS[selected.brand].bg }}
              >
                {selected.brand}
              </span>
              <h2 className="modal-name">{selected.name}</h2>
              <span
                className="modal-tier"
                style={{ color: TIER_INFO[selected.tier].color, borderColor: TIER_INFO[selected.tier].color }}
              >
                {selected.tier}티어
              </span>
            </div>

            <div className="modal-specs">
              {[
                ['VRAM', `${selected.vram}GB ${selected.vramType}`],
                ['코어 수', `${selected.cores.toLocaleString()}${selected.brand === 'Intel' ? ' Xe-cores' : ' Cores'}`],
                ['부스트 클럭', `${selected.boostClock.toLocaleString()} MHz`],
                ['메모리 대역폭', `${selected.memBandwidth} GB/s`],
                ['소비 전력 (TDP)', `${selected.tdp} W`],
                ['권장 파워', `${selected.recommendedPSU} W 이상`],
                ['PassMark 점수', selected.passmark.toLocaleString()],
                ['3DMark TimeSpy', selected.timeSpy.toLocaleString()],
                ['아키텍처', selected.arch],
                ['공정', selected.process],
                ['출시 연도', `${selected.releaseYear}년`],
                ['가격 (다나와 기준)', `₩${selected.price.toLocaleString()}`],
                ['가성비 점수', `${getValueScore(selected)}점 / 만원`],
              ].map(([k, v]) => (
                <div key={k} className="modal-row">
                  <span className="modal-key">{k}</span>
                  <span className="modal-val mono">{v}</span>
                </div>
              ))}
            </div>

            <div className="modal-res">
              <p className="modal-res-title">해상도별 게이밍 적합도</p>
              {[
                { label: 'FHD (1080p)', val: selected.fhd },
                { label: 'QHD (1440p)', val: selected.qhd },
                { label: '4K (2160p)',  val: selected.uhd },
              ].map(({ label, val }) => (
                <div key={label} className="modal-bar-row">
                  <span className="modal-bar-label">{label}</span>
                  <div className="modal-bar-track">
                    <div className="modal-bar-fill" style={{ width: `${val * 10}%` }} />
                  </div>
                  <span className="modal-bar-num mono">{val}/10</span>
                </div>
              ))}
            </div>

            <div className="modal-tags">
              {selected.highlights.map(h => (
                <span key={h} className="modal-tag">{h}</span>
              ))}
            </div>

            <a
              className="modal-naver"
              href={`https://search.shopping.naver.com/search/all?query=${selected.naverQuery}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              네이버 쇼핑 최저가 보기
            </a>

            <button
              className="modal-compare-btn"
              onClick={() => { closeDetail(); onNavigate('compare') }}
            >
              다른 GPU와 맞짱 비교하기 →
            </button>
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}
