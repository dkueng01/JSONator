"use client"

import { useState, useEffect } from "react"
import { loadFilterHistory, addToHistory } from "@/utils/storage"

export const useFilterHistory = () => {
  const [history, setHistory] = useState<string[]>([])

  useEffect(() => {
    setHistory(loadFilterHistory())
  }, [])

  const addFilter = (filter: string) => {
    const newHistory = addToHistory(filter, history)
    setHistory(newHistory)
  }

  const removeFilter = (filterToRemove: string) => {
    const newHistory = history.filter((item) => item !== filterToRemove)
    setHistory(newHistory)
  }

  const clearHistory = () => {
    setHistory([])
    try {
      localStorage.removeItem("jsonator-filter-history")
    } catch {
      // Silently fail
    }
  }

  return { history, addFilter, removeFilter, clearHistory }
}
