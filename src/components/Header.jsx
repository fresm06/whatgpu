import './Header.css'

const TABS = [
  { id: 'tier',    label: '티어표' },
  { id: 'compare', label: '맞짱 비교' },
  { id: 'value',   label: '가성비 랭킹' },
  { id: 'guide',   label: '구매 가이드' },
  { id: 'faq',     label: 'FAQ' },
]

export default function Header({ activeTab, onNavigate }) {
  return (
    <header className="hdr">
      <div className="hdr-scan" aria-hidden="true" />

      <div className="hdr-inner">
        {/* 브랜드 로고 */}
        <button className="hdr-brand" onClick={() => onNavigate('tier')}>
          <div className="brand-mark" aria-hidden="true">◆</div>
          <div className="brand-words">
            <span className="brand-top">그래픽카드</span>
            <span className="brand-main">맞짱</span>
          </div>
          <span className="brand-sub">GPU BENCHMARK & COMPARE</span>
        </button>

        {/* 탭 네비게이션 */}
        <nav className="hdr-nav" aria-label="메인 메뉴">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`hdr-tab${activeTab === t.id ? ' hdr-tab--on' : ''}`}
              onClick={() => onNavigate(t.id)}
              aria-current={activeTab === t.id ? 'page' : undefined}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
