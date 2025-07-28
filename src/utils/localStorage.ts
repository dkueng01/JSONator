const STORAGE_KEY = "json-filter-advanced-history"

export const loadFilterHistory = (): string[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const history = JSON.parse(saved)
      return Array.isArray(history) ? history : []
    }
  } catch (error) {
    console.error("Failed to load filter history:", error)
  }
  return []
}

export const saveFilterHistory = (history: string[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  } catch (error) {
    console.error("Failed to save filter history:", error)
  }
}

export const addToFilterHistory = (filter: string, currentHistory: string[]): string[] => {
  if (!filter.trim()) return currentHistory

  // Remove if already exists to avoid duplicates
  const filtered = currentHistory.filter((item) => item !== filter)
  // Add to beginning and keep only last 10
  return [filter, ...filtered].slice(0, 10)
}
