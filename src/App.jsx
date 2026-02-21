import { useState, useEffect } from 'react'
import Header from './components/Header'
import TierTable from './components/TierTable'
import CompareSection from './components/CompareSection'
import ValueRanking from './components/ValueRanking'
import GuideSection from './components/GuideSection'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import { useGpuData } from './hooks/useGpuData'
import './App.css'

const TABS = ['tier', 'compare', 'value', 'guide', 'faq']

function formatDate(d) {
  if (!d) return ''
  return d.toLocaleString('ko-KR', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function App() {
  const [tab, setTab] = useState(() => {
    const h = window.location.hash.replace('#', '')
    return TABS.includes(h) ? h : 'tier'
  })
  const { gpus, loading, error, lastUpdated, refresh } = useGpuData()

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace('#', '')
      if (TABS.includes(h)) setTab(h)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const navigate = (t) => {
    setTab(t)
    window.location.hash = t
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app-wrap">
      <Header activeTab={tab} onNavigate={navigate} />

      {/* 데이터 상태 바 */}
      <div className="data-bar">
        <div className="data-bar-inner">
          {loading && gpus.length === 0 ? (
            <span className="data-bar-status">데이터 로딩 중...</span>
          ) : error && gpus.length === 0 ? (
            <span className="data-bar-status data-bar-status--err">데이터 로드 실패. 잠시 후 다시 시도해주세요.</span>
          ) : (
            <>
              <span className="data-bar-status">
                GPU {gpus.length}종 · {lastUpdated ? `${formatDate(lastUpdated)} 기준` : ''}
              </span>
              <button className="data-bar-refresh" onClick={refresh} disabled={loading}>
                {loading ? '업데이트 중...' : '가격 새로고침'}
              </button>
            </>
          )}
        </div>
      </div>

      <main className="app-main">
        {loading && gpus.length === 0 ? (
          <div className="app-loading">
            <div className="app-loading-spinner" />
            <span>GPU 데이터 로딩 중...</span>
          </div>
        ) : (
          <>
            {tab === 'tier'    && <TierTable    gpus={gpus} onNavigate={navigate} />}
            {tab === 'compare' && <CompareSection gpus={gpus} />}
            {tab === 'value'   && <ValueRanking gpus={gpus} onNavigate={navigate} />}
            {tab === 'guide'   && <GuideSection />}
            {tab === 'faq'     && <FAQ />}
          </>
        )}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  )
}
