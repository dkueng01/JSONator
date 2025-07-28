"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { History, X, Copy, Check } from "lucide-react"

interface FilterHistoryProps {
  history: string[]
  onLoadFilter: (filter: string) => void
  onRemoveFilter: (filter: string) => void
  onClearHistory: () => void
  onCopyFilter: (filter: string) => void
  copiedFilter?: string
}

export const FilterHistory = ({
  history,
  onLoadFilter,
  onRemoveFilter,
  onClearHistory,
  onCopyFilter,
  copiedFilter,
}: FilterHistoryProps) => {
  if (!history.length) return null

  return (
    <div className="border-t border-slate-200 pt-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <History className="w-4 h-4" />
          Recent Filters
        </Label>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearHistory}
          className="text-xs text-slate-500 hover:text-red-500 h-7 px-3 rounded-md"
        >
          Clear All
        </Button>
      </div>
      <ScrollArea className="max-h-40">
        <div className="space-y-2 pr-4">
          {history.map((filter, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-200 group hover:from-slate-100 hover:to-slate-200 transition-all duration-200"
            >
              <button
                onClick={() => onLoadFilter(filter)}
                className="flex-1 text-left text-xs font-mono text-slate-700 truncate hover:text-slate-900 font-medium min-w-0"
                title={filter}
              >
                {filter}
              </button>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onCopyFilter(filter)}
                  className="h-6 w-6 p-0 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-all"
                  title="Copy filter"
                >
                  {copiedFilter === filter ? (
                    <Check className="w-3 h-3 text-green-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFilter(filter)}
                  className="h-6 w-6 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                  title="Remove filter"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
