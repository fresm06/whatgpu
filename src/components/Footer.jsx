import './Footer.css'

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-mark">◆</span>
          <span className="footer-title">그래픽카드 맞짱</span>
        </div>
        <p className="footer-desc">
          GPU 50종 벤치마크·스펙·가성비를 한눈에 비교. PassMark·3DMark 기반 데이터, 다나와 시세 기준.
        </p>
        <nav className="footer-nav">
          {[
            ['tier',    '티어표'],
            ['compare', '맞짱 비교'],
            ['value',   '가성비 랭킹'],
            ['guide',   '구매 가이드'],
            ['faq',     'FAQ'],
          ].map(([id, label]) => (
            <button key={id} className="footer-link" onClick={() => onNavigate(id)}>{label}</button>
          ))}
        </nav>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 그래픽카드 맞짱. 데이터 참고용으로 제공되며 실제 가격·성능은 변동될 수 있습니다.</span>
          <span className="footer-ad">본 사이트는 Google AdSense 광고를 게재합니다.</span>
        </div>
      </div>
    </footer>
  )
}
