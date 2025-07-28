const FILTER_HISTORY_KEY = "jsonator-filter-history"
const MAX_HISTORY_ITEMS = 10

export const loadFilterHistory = (): string[] => {
  try {
    const stored = localStorage.getItem(FILTER_HISTORY_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export const saveFilterHistory = (history: string[]): void => {
  try {
    localStorage.setItem(FILTER_HISTORY_KEY, JSON.stringify(history))
  } catch {
    // Silently fail if localStorage is not available
  }
}

export const addToHistory = (filter: string, currentHistory: string[]): string[] => {
  if (!filter.trim()) return currentHistory

  const filtered = currentHistory.filter((item) => item !== filter)
  const newHistory = [filter, ...filtered].slice(0, MAX_HISTORY_ITEMS)
  saveFilterHistory(newHistory)
  return newHistory
}
