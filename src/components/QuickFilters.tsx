"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { QuickFilter } from "./QuickFilter"
import type { FilterRule } from "@/types"

interface QuickFiltersProps {
  filters: FilterRule[]
  availableProperties: string[]
  onAddFilter: () => void
  onUpdateFilter: (id: string, field: keyof FilterRule, value: string | boolean) => void
  onRemoveFilter: (id: string) => void
}

export const QuickFilters = ({
  filters,
  availableProperties,
  onAddFilter,
  onUpdateFilter,
  onRemoveFilter,
}: QuickFiltersProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-0 mb-6">
        <ScrollArea className="h-full">
          <div className="space-y-4 pr-4">
            {filters.map((filter, index) => (
              <QuickFilter
                key={filter.id}
                filter={filter}
                index={index}
                availableProperties={availableProperties}
                onUpdate={(field, value) => onUpdateFilter(filter.id, field, value)}
                onRemove={() => onRemoveFilter(filter.id)}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      <Button
        variant="outline"
        onClick={onAddFilter}
        disabled={availableProperties.length === 0}
        className="w-full border-2 border-dashed border-slate-300 text-slate-600 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 hover:border-slate-400 bg-transparent h-14 rounded-2xl font-semibold transition-all duration-200 flex-shrink-0"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add New Filter
      </Button>
    </div>
  )
}
