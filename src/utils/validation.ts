export const parseJsonArray = (input: string): { data: any[]; error?: string } => {
  if (!input.trim()) {
    return { data: [] }
  }

  try {
    const parsed = JSON.parse(input)
    if (!Array.isArray(parsed)) {
      return { data: [], error: "Input must be a JSON array" }
    }
    return { data: parsed }
  } catch {
    return { data: [], error: "Invalid JSON format" }
  }
}

export const validateAdvancedFilter = (filter: string): boolean => {
  if (!filter.trim()) return false

  try {
    const testFunction = new Function("x", `return ${filter}`)
    testFunction({ test: "value" })
    return true
  } catch {
    return false
  }
}

export const extractProperties = (data: any[]): string[] => {
  if (!data.length) return []

  const properties = new Set<string>()

  const extractFromObject = (obj: any, prefix = ""): void => {
    if (obj && typeof obj === "object" && !Array.isArray(obj)) {
      Object.keys(obj).forEach((key) => {
        const fullKey = prefix ? `${prefix}.${key}` : key
        properties.add(fullKey)

        if (obj[key] && typeof obj[key] === "object" && !Array.isArray(obj[key])) {
          extractFromObject(obj[key], fullKey)
        }
      })
    }
  }

  data.forEach((item) => extractFromObject(item))
  return Array.from(properties).sort()
}
