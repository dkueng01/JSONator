import type { FilterRule, FilterResult } from "@/types"

const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((current, key) => current?.[key], obj)
}

export const applyQuickFilters = (data: any[], filters: FilterRule[]): any[] => {
  const activeFilters = filters.filter((f) => f.active && f.property && f.value)

  if (!activeFilters.length) return data

  return data.filter((item) => {
    return activeFilters.every((filter) => {
      const itemValue = getNestedValue(item, filter.property)
      const filterValue = filter.value

      switch (filter.operator) {
        case "===":
          return String(itemValue) === filterValue
        case "!==":
          return String(itemValue) !== filterValue
        case "contains":
          return String(itemValue).toLowerCase().includes(filterValue.toLowerCase())
        case ">":
          return Number(itemValue) > Number(filterValue)
        case "<":
          return Number(itemValue) < Number(filterValue)
        case ">=":
          return Number(itemValue) >= Number(filterValue)
        case "<=":
          return Number(itemValue) <= Number(filterValue)
        default:
          return true
      }
    })
  })
}

export const applyAdvancedFilter = (data: any[], filter: string): FilterResult => {
  if (!filter.trim()) return { data }

  try {
    const filterFunction: any = new Function("x", `return ${filter}`)
    const filteredData = data.filter(filterFunction)
    return { data: filteredData }
  } catch (error) {
    return {
      data: [],
      error: error instanceof Error ? error.message : "Filter execution failed",
    }
  }
}
