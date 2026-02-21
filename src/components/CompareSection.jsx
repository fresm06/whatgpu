import { useState, useEffect } from 'react'
import { GPUS, BRAND_COLORS, TIER_INFO, getValueScore } from '../data/gpuData'
import './CompareSection.css'

const METRICS = [
  { key: 'passmark',     label: 'PassMark 점수',    mono: true,  max: 35000, suffix: 'pt', higher: true },
  { key: 'timeSpy',      label: '3DMark TimeSpy',   mono: true,  max: 23000, suffix: 'pt', higher: true },
  { key: 'vram',         label: 'VRAM',             mono: true,  max: 24,    suffix: 'GB', higher: true },
  { key: 'boostClock',   label: '부스트 클럭',       mono: true,  max: 3000,  suffix: 'MHz', higher: true },
  { key: 'memBandwidth', label: '메모리 대역폭',     mono: true,  max: 1100,  suffix: 'GB/s', higher: true },
  { key: 'tdp',          label: '소비 전력 (TDP)',   mono: true,  max: 500,   suffix: 'W',  higher: false },
  { key: 'cores',        label: '코어 수',           mono: true,  max: 17000, suffix: '',   higher: true },
  { key: 'price',        label: '가격',             mono: true,  max: 2200000, suffix: '원', higher: false, isPrice: true },
]

function winner(a, b, key, higher) {
  if (!a || !b) return null
  if (a[key] === b[key]) return 'tie'
  if (higher) return a[key] > b[key] ? 'left' : 'right'
  return a[key] < b[key] ? 'left' : 'right'
}

export default function CompareSection() {
  const [leftId,  setLeftId]  = useState(GPUS[0].id)
  const [rightId, setRightId] = useState(GPUS[3].id)
  const [reveal,  setReveal]  = useState(false)
  const [query,   setQuery]   = useState({ left: '', right: '' })

  const left  = GPUS.find(g => g.id === leftId)
  const right = GPUS.find(g => g.id === rightId)

  useEffect(() => { setReveal(false); const t = setTimeout(() => setReveal(true), 80); return () => clearTimeout(t) }, [leftId, rightId])

  const filteredGpus = (side) => {
    const q = query[side].toLowerCase()
    return q ? GPUS.filter(g => g.shortName.toLowerCase().includes(q) || g.name.toLowerCase().includes(q)) : GPUS
  }

  const overallWinner = () => {
    if (!left || !right) return null
    const score = (g) => (g.passmark * 0.6) + (g.timeSpy * 0.4)
    if (score(left) > score(right)) return 'left'
    if (score(right) > score(left)) return 'right'
    return 'tie'
  }

  const ow = overallWinner()

  const GpuSelector = ({ side, value, onChange }) => (
    <div className="gpu-sel">
      <input
        className="gpu-sel-input"
        placeholder="GPU 검색..."
        value={query[side]}
        onChange={e => setQuery(p => ({ ...p, [side]: e.target.value }))}
      />
      <select
        className="gpu-sel-drop"
        value={value}
        onChange={e => { onChange(e.target.value); setQuery(p => ({ ...p, [side]: '' })) }}
      >
        {filteredGpus(side).map(g => (
          <option key={g.id} value={g.id}>{g.shortName} — ₩{(g.price/10000).toFixed(0)}만</option>
        ))}
      </select>
    </div>
  )

  return (
    <section className="cmp-page">
      <div className="cmp-hero">
        <h1 className="cmp-h1">
          <span className="cmp-h1-label">1:1</span>
          <span className="cmp-h1-main neon">맞짱 비교</span>
        </h1>
        <p className="cmp-desc">두 그래픽카드를 선택하면 스펙·벤치마크·가격을 직접 비교합니다. 승자 항목은 <span className="neon">네온</span>으로 표시됩니다.</p>
      </div>

      {/* GPU 선택 영역 */}
      <div className="cmp-selectors">
        <div className="cmp-side cmp-side--left">
          <p className="cmp-side-label">◀ 도전자 A</p>
          <GpuSelector side="left" value={leftId} onChange={setLeftId} />
        </div>
        <div className="cmp-vs">
          <span className="cmp-vs-text">VS</span>
          <div className="cmp-vs-bolt">⚡</div>
        </div>
        <div className="cmp-side cmp-side--right">
          <p className="cmp-side-label">도전자 B ▶</p>
          <GpuSelector side="right" value={rightId} onChange={setRightId} />
        </div>
      </div>

      {/* 결과 카드 */}
      {reveal && left && right && (
        <div className="cmp-result">
          {/* 상단 카드 요약 */}
          <div className="cmp-cards">
            <div className={`cmp-card${ow === 'left' ? ' cmp-card--winner' : ''}`}>
              {ow === 'left' && <div className="cmp-winner-badge">👑 승리</div>}
              <span className="cmp-card-brand" style={{ color: BRAND_COLORS[left.brand].color, background: BRAND_COLORS[left.brand].bg }}>{left.brand}</span>
              <h2 className="cmp-card-name">{left.name}</h2>
              <div className="cmp-card-tier" style={{ color: TIER_INFO[left.tier].color }}>{left.tier}티어</div>
              <div className="cmp-card-price mono">₩{left.price.toLocaleString()}</div>
              <div className="cmp-card-pm mono">{left.passmark.toLocaleString()} PM</div>
              <a
                className="cmp-naver-btn"
                href={`https://search.shopping.naver.com/search/all?query=${left.naverQuery}`}
                target="_blank" rel="noopener noreferrer"
              >🛒 최저가 보기</a>
            </div>

            <div className="cmp-score-mid">
              <div className="cmp-score-item">
                <span className="cmp-score-label">PassMark 차이</span>
                <span className="cmp-score-val mono">{Math.abs(left.passmark - right.passmark).toLocaleString()}</span>
              </div>
              <div className="cmp-score-item">
                <span className="cmp-score-label">가격 차이</span>
                <span className="cmp-score-val mono">₩{Math.abs(left.price - right.price).toLocaleString()}</span>
              </div>
              <div className="cmp-score-item">
                <span className="cmp-score-label">가성비 (좌)</span>
                <span className="cmp-score-val mono">{getValueScore(left)}</span>
              </div>
              <div className="cmp-score-item">
                <span className="cmp-score-label">가성비 (우)</span>
                <span className="cmp-score-val mono">{getValueScore(right)}</span>
              </div>
            </div>

            <div className={`cmp-card${ow === 'right' ? ' cmp-card--winner' : ''}`}>
              {ow === 'right' && <div className="cmp-winner-badge">👑 승리</div>}
              <span className="cmp-card-brand" style={{ color: BRAND_COLORS[right.brand].color, background: BRAND_COLORS[right.brand].bg }}>{right.brand}</span>
              <h2 className="cmp-card-name">{right.name}</h2>
              <div className="cmp-card-tier" style={{ color: TIER_INFO[right.tier].color }}>{right.tier}티어</div>
              <div className="cmp-card-price mono">₩{right.price.toLocaleString()}</div>
              <div className="cmp-card-pm mono">{right.passmark.toLocaleString()} PM</div>
              <a
                className="cmp-naver-btn"
                href={`https://search.shopping.naver.com/search/all?query=${right.naverQuery}`}
                target="_blank" rel="noopener noreferrer"
              >🛒 최저가 보기</a>
            </div>
          </div>

          {/* 상세 스펙 비교 바 */}
          <div className="cmp-table">
            <h3 className="cmp-table-title">상세 스펙 비교</h3>
            {METRICS.map(m => {
              const w = winner(left, right, m.key, m.higher)
              const lv = left[m.key]
              const rv = right[m.key]
              const lPct = m.isPrice
                ? Math.min(100, (lv / m.max) * 100)
                : Math.min(100, (lv / m.max) * 100)
              const rPct = Math.min(100, (rv / m.max) * 100)

              const fmt = (v) => m.isPrice
                ? `₩${(v/10000).toFixed(0)}만`
                : m.key === 'cores' && left.brand === 'Intel'
                  ? `${v} Xe`
                  : `${v.toLocaleString()}${m.suffix}`

              return (
                <div key={m.key} className="cmp-metric">
                  <div className="cmp-metric-label">{m.label}</div>
                  <div className="cmp-bars">
                    {/* 왼쪽 바 */}
                    <div className="cmp-bar-wrap cmp-bar-wrap--left">
                      <span className={`cmp-bar-val mono${w === 'left' ? ' cmp-bar-val--win' : ''}`}>{fmt(lv)}</span>
                      <div className="cmp-bar-track">
                        <div
                          className={`cmp-bar-fill cmp-bar-fill--left${w === 'left' ? ' cmp-bar-fill--win' : ''}`}
                          style={{ '--w': `${lPct}%`, width: `${lPct}%` }}
                        />
                      </div>
                    </div>

                    {/* 승패 표시 */}
                    <div className="cmp-bar-mid">
                      {w === 'tie' ? <span className="cmp-tie">—</span>
                        : w === 'left'  ? <span className="cmp-win-l">◀</span>
                        : <span className="cmp-win-r">▶</span>}
                    </div>

                    {/* 오른쪽 바 */}
                    <div className="cmp-bar-wrap cmp-bar-wrap--right">
                      <div className="cmp-bar-track">
                        <div
                          className={`cmp-bar-fill cmp-bar-fill--right${w === 'right' ? ' cmp-bar-fill--win' : ''}`}
                          style={{ '--w': `${rPct}%`, width: `${rPct}%` }}
                        />
                      </div>
                      <span className={`cmp-bar-val mono${w === 'right' ? ' cmp-bar-val--win' : ''}`}>{fmt(rv)}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* 해상도별 적합도 */}
          <div className="cmp-res-section">
            <h3 className="cmp-table-title">해상도별 게이밍 적합도</h3>
            <div className="cmp-res-grid">
              {[
                { key: 'fhd', label: 'FHD (1080p)' },
                { key: 'qhd', label: 'QHD (1440p)' },
                { key: 'uhd', label: '4K (2160p)' },
              ].map(({ key, label }) => {
                const lv = left[key]; const rv = right[key]
                const w = lv > rv ? 'left' : rv > lv ? 'right' : 'tie'
                return (
                  <div key={key} className="cmp-res-row">
                    <div className="cmp-res-label">{label}</div>
                    <div className="cmp-res-bars">
                      <div className={`cmp-res-bar-wrap${w === 'left' ? ' win' : ''}`}>
                        <div className="cmp-res-track">
                          <div className="cmp-res-fill" style={{ width: `${lv * 10}%` }} />
                        </div>
                        <span className="cmp-res-score mono">{lv}/10</span>
                      </div>
                      <div className={`cmp-res-bar-wrap${w === 'right' ? ' win' : ''}`}>
                        <div className="cmp-res-track">
                          <div className="cmp-res-fill" style={{ width: `${rv * 10}%` }} />
                        </div>
                        <span className="cmp-res-score mono">{rv}/10</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 결론 텍스트 */}
          <div className="cmp-verdict">
            <h3 className="cmp-verdict-title">⚡ 맞짱 결과</h3>
            {ow === 'tie' ? (
              <p className="cmp-verdict-text">두 GPU의 종합 성능이 <strong>동일합니다.</strong> 가격이 더 저렴한 쪽 또는 VRAM·전력 소모를 기준으로 선택하세요.</p>
            ) : (
              <p className="cmp-verdict-text">
                종합 성능 기준으로 <strong style={{ color: 'var(--accent)' }}>{ow === 'left' ? left.shortName : right.shortName}</strong>이 승리합니다.
                PassMark 기준 약 <strong>{(Math.abs(left.passmark - right.passmark) / Math.min(left.passmark, right.passmark) * 100).toFixed(1)}%</strong> 차이가 납니다.
                가성비는 {parseFloat(getValueScore(left)) > parseFloat(getValueScore(right)) ? left.shortName : right.shortName}이 더 높습니다.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
