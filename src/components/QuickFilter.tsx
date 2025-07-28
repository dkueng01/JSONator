"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import type { FilterRule, FilterOperator } from "@/types"

interface QuickFilterProps {
  filter: FilterRule
  index: number
  availableProperties: string[]
  onUpdate: (field: keyof FilterRule, value: string | boolean) => void
  onRemove: () => void
}

const OPERATORS: { value: FilterOperator; label: string }[] = [
  { value: "===", label: "equals" },
  { value: "!==", label: "not equals" },
  { value: "contains", label: "contains" },
  { value: ">", label: ">" },
  { value: "<", label: "<" },
  { value: ">=", label: ">=" },
  { value: "<=", label: "<=" },
]

export const QuickFilter = ({ filter, index, availableProperties, onUpdate, onRemove }: QuickFilterProps) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
        filter.active
          ? "bg-gradient-to-br from-white to-purple-50 border-purple-200 shadow-lg shadow-purple-100/50"
          : "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <Switch
            checked={filter.active}
            onCheckedChange={(checked) => onUpdate("active", checked)}
            className="data-[state=checked]:bg-purple-600"
          />
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${filter.active ? "bg-purple-500" : "bg-slate-400"}`} />
            <span className="text-sm font-bold text-slate-800">Filter {index + 1}</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="h-8 w-8 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="px-4 pb-4">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-5">
            <Label className="text-xs font-bold text-slate-600 mb-2 block uppercase tracking-wide">Property</Label>
            <select
              value={filter.property}
              onChange={(e) => onUpdate("property", e.target.value)}
              className={`w-full p-3 text-sm border-2 rounded-xl font-medium transition-all ${
                filter.active
                  ? "border-purple-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 bg-white"
                  : "border-slate-200 bg-slate-50 text-slate-500"
              } disabled:cursor-not-allowed`}
              disabled={!filter.active}
            >
              {availableProperties.map((prop) => (
                <option key={prop} value={prop}>
                  {prop}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-3">
            <Label className="text-xs font-bold text-slate-600 mb-2 block uppercase tracking-wide">Operator</Label>
            <select
              value={filter.operator}
              onChange={(e) => onUpdate("operator", e.target.value)}
              className={`w-full p-3 text-sm border-2 rounded-xl font-medium transition-all ${
                filter.active
                  ? "border-purple-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 bg-white"
                  : "border-slate-200 bg-slate-50 text-slate-500"
              } disabled:cursor-not-allowed`}
              disabled={!filter.active}
            >
              {OPERATORS.map((op) => (
                <option key={op.value} value={op.value}>
                  {op.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-4">
            <Label className="text-xs font-bold text-slate-600 mb-2 block uppercase tracking-wide">Value</Label>
            <Input
              value={filter.value}
              onChange={(e) => onUpdate("value", e.target.value)}
              placeholder="Enter value..."
              className={`text-sm border-2 rounded-xl font-medium transition-all ${
                filter.active
                  ? "border-purple-200 focus:border-purple-400 focus:ring-purple-100 bg-white"
                  : "border-slate-200 bg-slate-50"
              } disabled:cursor-not-allowed`}
              disabled={!filter.active}
            />
          </div>
        </div>
      </div>

      {filter.active && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-600" />
      )}
    </div>
  )
}
