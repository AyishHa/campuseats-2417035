import { useState, useEffect } from "react"

export function useVendors(){
    const [vendors, setVendors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [reloadKey, setReloadKey] = useState(0)

    useEffect(() => {
       const controller = new AbortController()
        setLoading(true)
        setError(null)

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        console.log("Fetch status:", res.status) //FIX STEPS
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        console.log("Fetched vendors:", data) //FIX STEPS
        setVendors(data)
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setError(error.message)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => { controller.abort() }
  }, [reloadKey])

  function reload(){
    setLoading(true)
    setError(null)
    setReloadKey((k) => k+1)
  }
  return{vendors, loading, error, reload}
}