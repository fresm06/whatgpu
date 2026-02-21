import { useState, useEffect } from 'react'
import Header from './components/Header'
import TierTable from './components/TierTable'
import CompareSection from './components/CompareSection'
import ValueRanking from './components/ValueRanking'
import GuideSection from './components/GuideSection'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import './App.css'

const TABS = ['tier', 'compare', 'value', 'guide', 'faq']

export default function App() {
  const [tab, setTab] = useState(() => {
    const h = window.location.hash.replace('#', '')
    return TABS.includes(h) ? h : 'tier'
  })

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
      <main className="app-main">
        {tab === 'tier'    && <TierTable    onNavigate={navigate} />}
        {tab === 'compare' && <CompareSection />}
        {tab === 'value'   && <ValueRanking onNavigate={navigate} />}
        {tab === 'guide'   && <GuideSection />}
        {tab === 'faq'     && <FAQ />}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  )
}
