'use client'
import { useEffect, useState } from 'react'

export default function GlobalLoader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="w-10 h-10 border-4 border-gray-600 border-t-white rounded-full animate-spin" />
    </div>
  )
}