import { GPUS, BRAND_COLORS, TIER_INFO, getValueScore } from '../data/gpuData'
import './ValueRanking.css'

const sorted = [...GPUS].sort((a, b) => parseFloat(getValueScore(b)) - parseFloat(getValueScore(a)))

export default function ValueRanking({ onNavigate }) {
  return (
    <section className="val-page">
      <div className="val-hero">
        <h1 className="val-h1">
          <span className="val-h1-label">PassMark / 만원</span>
          <span className="val-h1-main neon">가성비 랭킹</span>
        </h1>
        <p className="val-desc">
          다나와 기준 가격을 바탕으로 <strong>PassMark 점수 ÷ 가격(만원)</strong>으로 진정한 가성비 순위를 계산했습니다.
          숫자가 높을수록 돈 대비 성능이 뛰어난 그래픽카드입니다.
        </p>
      </div>

      <div className="val-list">
        {sorted.map((gpu, i) => {
          const score = getValueScore(gpu)
          const maxScore = parseFloat(getValueScore(sorted[0]))
          const barPct = (parseFloat(score) / maxScore) * 100
          const bc = BRAND_COLORS[gpu.brand]
          const ti = TIER_INFO[gpu.tier]
          const topRank = i < 3

          return (
            <div key={gpu.id} className={`val-row${topRank ? ' val-row--top' : ''}`} style={{ animationDelay: `${i * 0.025}s` }}>
              {/* 순위 */}
              <div className="val-rank">
                <span className={`val-num mono${topRank ? ' val-num--top' : ''}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* GPU 정보 */}
              <div className="val-info">
                <div className="val-info-top">
                  <span className="val-brand" style={{ color: bc.color, background: bc.bg }}>{gpu.brand}</span>
                  <span className="val-tier" style={{ color: ti.color, borderColor: ti.color }}>{gpu.tier}티어</span>
                </div>
                <div className="val-name">{gpu.shortName}</div>
                <div className="val-sub">
                  <span className="val-spec">VRAM {gpu.vram}GB</span>
                  <span className="val-sep">·</span>
                  <span className="val-spec">{gpu.tdp}W</span>
                  <span className="val-sep">·</span>
                  <span className="val-spec">PM {gpu.passmark.toLocaleString()}</span>
                </div>
              </div>

              {/* 점수 바 */}
              <div className="val-bar-area">
                <div className="val-bar-track">
                  <div
                    className="val-bar-fill"
                    style={{ '--w': `${barPct}%`, width: `${barPct}%` }}
                  />
                </div>
                <div className="val-score-row">
                  <span className="val-score-num mono">{score}</span>
                  <span className="val-score-label">점/만원</span>
                </div>
              </div>

              {/* 가격 */}
              <div className="val-price-col">
                <span className="val-price mono">₩{(gpu.price / 10000).toFixed(0)}만</span>
                <a
                  className="val-buy"
                  href={`https://search.shopping.naver.com/search/all?query=${gpu.naverQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  최저가
                </a>
              </div>
            </div>
          )
        })}
      </div>

      {/* 안내 기사 */}
      <div className="val-article">
        <h2 className="va-h2">가성비 그래픽카드 구매 가이드 — 예산별 추천</h2>
        <p className="va-p">
          그래픽카드 구매 시 단순히 높은 성능만을 보는 것은 현명하지 않습니다. 예산 대비 얼마나 많은 성능을 얻을 수 있는지,
          즉 <strong>가성비(가격 대비 성능)</strong>를 따져봐야 합니다. 위 랭킹은 다나와 최저가 기준 PassMark 점수를 나눈 값으로,
          실제로 돈을 가장 잘 쓸 수 있는 GPU를 객관적으로 보여줍니다.
        </p>
        <h3 className="va-h3">30만원 이하 — RX 7600, GTX 1660 Super</h3>
        <p className="va-p">
          30만원 이하 예산이라면 AMD RX 7600이 가장 훌륭한 선택입니다. FHD(1080p) 게이밍에서 대부분의 최신 게임을
          60~144fps로 즐길 수 있으며, FSR 3.0을 지원해 성능을 더욱 끌어올릴 수 있습니다. 중고 시장에서 GTX 1660 Super도
          좋은 대안이 될 수 있습니다.
        </p>
        <h3 className="va-h3">50만원 이하 — RX 7800 XT, RTX 4070</h3>
        <p className="va-p">
          50만원대에서는 AMD RX 7800 XT가 단연 돋보입니다. 16GB의 여유로운 VRAM과 QHD에서도 쾌적한 성능을 보여주며,
          FSR 3.0 프레임 생성 기능도 지원합니다. NVIDIA를 선호한다면 RTX 4070이 DLSS 3.0과 Frame Generation을 통해
          뛰어난 게이밍 경험을 제공합니다. 저전력(200W)이라 전기세 절감 효과도 있습니다.
        </p>
        <h3 className="va-h3">100만원 이하 — RTX 4070 Ti Super, RX 7900 GRE</h3>
        <p className="va-p">
          100만원 이하에서는 RTX 4070 Ti Super가 16GB VRAM으로 QHD/4K 모두 원활하게 즐길 수 있어 강력 추천합니다.
          AMD를 선호한다면 RX 7900 GRE가 뛰어난 가성비로 선택받고 있습니다. 이 구간에서는 4K 게이밍도 60fps 이상
          안정적으로 유지할 수 있어 고해상도 모니터 사용자에게 적합합니다.
        </p>
        <div className="va-cta">
          <span>두 GPU를 직접 맞짱 비교해보세요</span>
          <button onClick={() => onNavigate('compare')}>맞짱 비교 →</button>
        </div>
      </div>
    </section>
  )
}
