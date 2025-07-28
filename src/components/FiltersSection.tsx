"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter } from "lucide-react"
import { QuickFilters } from "./QuickFilters"
import { AdvancedFilter } from "./AdvancedFilter"
import type { FilterRule, FilterMode } from "@/types"

interface FiltersSectionProps {
  mode: FilterMode
  onModeChange: (mode: FilterMode) => void
  quickFilters: FilterRule[]
  availableProperties: string[]
  activeFilterCount: number
  onAddQuickFilter: () => void
  onUpdateQuickFilter: (id: string, field: keyof FilterRule, value: string | boolean) => void
  onRemoveQuickFilter: (id: string) => void
  advancedFilter: string
  appliedAdvancedFilter: string
  onAdvancedFilterChange: (value: string) => void
  onApplyAdvancedFilter: () => void
  isAdvancedFilterValid: boolean
  hasAdvancedFilterChanged: boolean
  advancedFilterError?: string
  filterHistory: string[]
  onLoadFromHistory: (filter: string) => void
  onRemoveFromHistory: (filter: string) => void
  onClearHistory: () => void
  onCopyFromHistory: (filter: string) => void
  copiedHistoryFilter?: string
}

export const FiltersSection = ({
  mode,
  onModeChange,
  quickFilters,
  availableProperties,
  activeFilterCount,
  onAddQuickFilter,
  onUpdateQuickFilter,
  onRemoveQuickFilter,
  advancedFilter,
  appliedAdvancedFilter,
  onAdvancedFilterChange,
  onApplyAdvancedFilter,
  isAdvancedFilterValid,
  hasAdvancedFilterChanged,
  advancedFilterError,
  filterHistory,
  onLoadFromHistory,
  onRemoveFromHistory,
  onClearHistory,
  onCopyFromHistory,
  copiedHistoryFilter,
}: FiltersSectionProps) => {
  return (
    <Card className="shadow-sm border-slate-200 flex flex-col h-full">
      <CardHeader className="pb-4 flex-shrink-0">
        <CardTitle className="flex items-center gap-3 text-slate-700">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Filter className="w-4 h-4 text-purple-600" />
          </div>
          Filters
          {mode === "quick" && activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-auto bg-purple-100 text-purple-700 border-purple-200">
              {activeFilterCount} active
            </Badge>
          )}
          {mode === "advanced" && appliedAdvancedFilter && (
            <Badge variant="secondary" className="ml-auto bg-purple-100 text-purple-700 border-purple-200">
              Applied
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-6 min-h-0 overflow-hidden">
        <Tabs value={mode} onValueChange={onModeChange} className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-2 bg-slate-100 flex-shrink-0 mb-6 h-12 rounded-xl">
            <TabsTrigger
              value="quick"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-semibold"
            >
              Quick Filters
            </TabsTrigger>
            <TabsTrigger
              value="advanced"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-semibold"
            >
              Advanced
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 min-h-0 overflow-hidden">
            <TabsContent value="quick" className="h-full m-0 data-[state=inactive]:hidden">
              <QuickFilters
                filters={quickFilters}
                availableProperties={availableProperties}
                onAddFilter={onAddQuickFilter}
                onUpdateFilter={onUpdateQuickFilter}
                onRemoveFilter={onRemoveQuickFilter}
              />
            </TabsContent>

            <TabsContent value="advanced" className="h-full m-0 data-[state=inactive]:hidden">
              <AdvancedFilter
                value={advancedFilter}
                appliedValue={appliedAdvancedFilter}
                onChange={onAdvancedFilterChange}
                onApply={onApplyAdvancedFilter}
                isValid={isAdvancedFilterValid}
                hasChanged={hasAdvancedFilterChanged}
                error={advancedFilterError}
                history={filterHistory}
                onLoadFromHistory={onLoadFromHistory}
                onRemoveFromHistory={onRemoveFromHistory}
                onClearHistory={onClearHistory}
                onCopyFromHistory={onCopyFromHistory}
                copiedHistoryFilter={copiedHistoryFilter}
              />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
