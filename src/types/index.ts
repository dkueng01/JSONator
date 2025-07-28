export interface FilterRule {
  id: string
  property: string
  operator: FilterOperator
  value: string
  active: boolean
}

export type FilterOperator = "===" | "!==" | "contains" | ">" | "<" | ">=" | "<="

export type FilterMode = "quick" | "advanced"

export interface FilterResult {
  data: any[]
  error?: string
}
