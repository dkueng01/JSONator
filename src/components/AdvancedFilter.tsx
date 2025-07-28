"use client"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, AlertCircle } from "lucide-react"
import { FilterHistory } from "./FilterHistory"

interface AdvancedFilterProps {
  value: string
  appliedValue: string
  onChange: (value: string) => void
  onApply: () => void
  isValid: boolean
  hasChanged: boolean
  error?: string
  history: string[]
  onLoadFromHistory: (filter: string) => void
  onRemoveFromHistory: (filter: string) => void
  onClearHistory: () => void
  onCopyFromHistory: (filter: string) => void
  copiedHistoryFilter?: string
}

export const AdvancedFilter = ({
  value,
  appliedValue,
  onChange,
  onApply,
  isValid,
  hasChanged,
  error,
  history,
  onLoadFromHistory,
  onRemoveFromHistory,
  onClearHistory,
  onCopyFromHistory,
  copiedHistoryFilter,
}: AdvancedFilterProps) => {
  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 min-h-0">
        <div className="space-y-6 pr-4">
          {/* Main Filter Input */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-100">
            <Label className="text-sm font-bold text-slate-800 mb-4 block flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              JavaScript Expression
            </Label>

            <Textarea
              placeholder='(x.CfgID_s === "ElectricalComponent" || x.CfgID_s === "Leuchte") && x.V_Type === "V_H2W"'
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="min-h-[140px] font-mono text-sm border-2 border-purple-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 resize-none rounded-xl bg-white shadow-sm"
            />

            <div className="flex items-center justify-between mt-4">
              <div className="flex-1">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Use <code className="bg-white px-2 py-1 rounded-md border font-semibold text-purple-700">x</code> to
                  reference each item.
                  <br />
                  Example:{" "}
                  <code className="bg-white px-2 py-1 rounded-md border font-mono text-xs">x.property === "value"</code>
                </p>
              </div>

              <Button
                onClick={onApply}
                disabled={!isValid || !hasChanged}
                className={`ml-4 gap-2 px-6 py-2 rounded-xl font-bold transition-all duration-200 ${
                  isValid && hasChanged
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-200"
                    : "bg-slate-300 cursor-not-allowed"
                }`}
              >
                <Play className="w-4 h-4" />
                Apply Filter
              </Button>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 text-xs font-medium ${
                isValid ? "text-green-600" : value.trim() ? "text-red-600" : "text-slate-400"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isValid ? "bg-green-500" : value.trim() ? "bg-red-500" : "bg-slate-400"
                }`}
              />
              {isValid ? "Valid syntax" : value.trim() ? "Invalid syntax" : "No filter"}
            </div>

            {appliedValue && (
              <div className="flex items-center gap-2 text-xs font-medium text-purple-600">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                Filter applied
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-center gap-3 text-red-600 text-sm bg-red-50 p-4 rounded-xl border-2 border-red-200">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Filter History */}
          <FilterHistory
            history={history}
            onLoadFilter={onLoadFromHistory}
            onRemoveFilter={onRemoveFromHistory}
            onClearHistory={onClearHistory}
            onCopyFilter={onCopyFromHistory}
            copiedFilter={copiedHistoryFilter}
          />
        </div>
      </ScrollArea>
    </div>
  )
}
