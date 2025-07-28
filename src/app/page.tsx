"use client"

import { useState, useMemo } from "react"
import { SplashScreen } from "@/components/SplashScreen"
import { JsonInput } from "@/components/JsonInput"
import { FiltersSection } from "@/components/FiltersSection"
import { ResultsSection } from "@/components/ResultsSection"
import { useJsonData } from "@/hooks/useJsonData"
import { useFilterHistory } from "@/hooks/useFilterHistory"
import { useClipboard } from "@/hooks/useClipboard"
import { applyQuickFilters, applyAdvancedFilter } from "@/utils/filtering"
import { validateAdvancedFilter, extractProperties } from "@/utils/validation"
import type { FilterRule, FilterMode } from "@/types"

export default function JSONator() {
  // UI State
  const [showSplash, setShowSplash] = useState(true)
  const [jsonInput, setJsonInput] = useState("")
  const [filterMode, setFilterMode] = useState<FilterMode>("quick")
  const [copiedHistoryFilter, setCopiedHistoryFilter] = useState<string>()

  // Filter State
  const [quickFilters, setQuickFilters] = useState<FilterRule[]>([])
  const [advancedFilter, setAdvancedFilter] = useState("")
  const [appliedAdvancedFilter, setAppliedAdvancedFilter] = useState("")
  const [advancedFilterError, setAdvancedFilterError] = useState<string>()

  // Hooks
  const { data: jsonData, error: jsonError } = useJsonData(jsonInput)
  const { history, addFilter: addToHistory, removeFilter: removeFromHistory, clearHistory } = useFilterHistory()
  const { copied, copy } = useClipboard()

  // Computed Values
  const availableProperties = useMemo(() => extractProperties(jsonData), [jsonData])
  const isAdvancedFilterValid = useMemo(() => validateAdvancedFilter(advancedFilter), [advancedFilter])
  const hasAdvancedFilterChanged = advancedFilter.trim() !== appliedAdvancedFilter.trim()
  const activeFilterCount = quickFilters.filter((f) => f.active).length

  // Apply Filters
  const filteredData = useMemo(() => {
    if (!jsonData.length) return []

    if (filterMode === "quick") {
      return applyQuickFilters(jsonData, quickFilters)
    } else if (filterMode === "advanced" && appliedAdvancedFilter.trim()) {
      const result = applyAdvancedFilter(jsonData, appliedAdvancedFilter)
      setAdvancedFilterError(result.error)
      return result.data
    }

    return jsonData
  }, [jsonData, quickFilters, appliedAdvancedFilter, filterMode])

  // Quick Filter Handlers
  const addQuickFilter = () => {
    if (!availableProperties.length) return

    const newFilter: FilterRule = {
      id: Date.now().toString(),
      property: availableProperties[0],
      operator: "===",
      value: "",
      active: true,
    }
    setQuickFilters((prev) => [...prev, newFilter])
  }

  const updateQuickFilter = (id: string, field: keyof FilterRule, value: string | boolean) => {
    setQuickFilters((prev) => prev.map((filter) => (filter.id === id ? { ...filter, [field]: value } : filter)))
  }

  const removeQuickFilter = (id: string) => {
    setQuickFilters((prev) => prev.filter((filter) => filter.id !== id))
  }

  // Advanced Filter Handlers
  const applyAdvancedFilterHandler = () => {
    if (!isAdvancedFilterValid || !hasAdvancedFilterChanged) return

    setAppliedAdvancedFilter(advancedFilter)
    if (advancedFilter.trim()) {
      addToHistory(advancedFilter)
    }
  }

  const loadFilterFromHistory = (filter: string) => {
    setAdvancedFilter(filter)
  }

  const copyFilterFromHistory = async (filter: string) => {
    const success = await copy(filter)
    if (success) {
      setCopiedHistoryFilter(filter)
      setTimeout(() => setCopiedHistoryFilter(undefined), 2000)
    }
  }

  // Copy Handler
  const copyResults = () => {
    copy(JSON.stringify(filteredData, null, 2))
  }

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />
  }

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      <div className="flex-1 p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-0">
        <div className="grid lg:grid-cols-5 gap-4 sm:gap-6 h-full">
          {/* Input Section */}
          <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6 min-h-0">
            <JsonInput value={jsonInput} onChange={setJsonInput} itemCount={jsonData.length} error={jsonError} />

            <div className="flex-1 min-h-0">
              <FiltersSection
                mode={filterMode}
                onModeChange={setFilterMode}
                quickFilters={quickFilters}
                availableProperties={availableProperties}
                activeFilterCount={activeFilterCount}
                onAddQuickFilter={addQuickFilter}
                onUpdateQuickFilter={updateQuickFilter}
                onRemoveQuickFilter={removeQuickFilter}
                advancedFilter={advancedFilter}
                appliedAdvancedFilter={appliedAdvancedFilter}
                onAdvancedFilterChange={setAdvancedFilter}
                onApplyAdvancedFilter={applyAdvancedFilterHandler}
                isAdvancedFilterValid={isAdvancedFilterValid}
                hasAdvancedFilterChanged={hasAdvancedFilterChanged}
                advancedFilterError={advancedFilterError}
                filterHistory={history}
                onLoadFromHistory={loadFilterFromHistory}
                onRemoveFromHistory={removeFromHistory}
                onClearHistory={clearHistory}
                onCopyFromHistory={copyFilterFromHistory}
                copiedHistoryFilter={copiedHistoryFilter}
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-3 min-h-0">
            <ResultsSection
              data={filteredData}
              totalCount={jsonData.length}
              onCopy={copyResults}
              copySuccess={copied}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
