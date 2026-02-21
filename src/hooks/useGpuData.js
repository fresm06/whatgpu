import { useState, useEffect, useCallback } from 'react'

const CACHE_KEY = 'gpudata_cache_v1'
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24시간

export function useGpuData() {
  const [gpus, setGpus] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchData = useCallback(async (force = false) => {
    if (!force) {
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const { ts, data } = JSON.parse(cached)
          if (Date.now() - ts < CACHE_TTL) {
            setGpus(data.gpus)
            setLastUpdated(new Date(ts))
            setLoading(false)
            return
          }
        }
      } catch (_) { /* 캐시 파싱 오류 무시 */ }
    }

    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/data/gpus.json?_=${Date.now()}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      const ts = Date.now()
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ ts, data }))
      } catch (_) { /* 저장 용량 초과 시 무시 */ }
      setGpus(data.gpus)
      setLastUpdated(new Date(ts))
    } catch (e) {
      setError(e.message)
      // 캐시가 만료되었더라도 사용
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const { ts, data } = JSON.parse(cached)
          setGpus(data.gpus)
          setLastUpdated(new Date(ts))
        }
      } catch (_) { /* 무시 */ }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  return {
    gpus,
    loading,
    error,
    lastUpdated,
    refresh: () => fetchData(true),
  }
}
