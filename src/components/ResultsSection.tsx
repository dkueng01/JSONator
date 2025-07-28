"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Code2, Copy, Check } from "lucide-react"

interface ResultsSectionProps {
  data: any[]
  totalCount: number
  onCopy: () => void
  copySuccess: boolean
}

export const ResultsSection = ({ data, totalCount, onCopy, copySuccess }: ResultsSectionProps) => {
  const displayText =
    data.length > 0
      ? JSON.stringify(data, null, 2)
      : totalCount > 0
        ? "// No items match the current filters"
        : "// Paste your JSON array to get started"

  return (
    <Card className="h-full shadow-sm border-slate-200 flex flex-col">
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-slate-700">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Code2 className="w-4 h-4 text-emerald-600" />
            </div>
            Filtered Results
          </CardTitle>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">
              {data.length} / {totalCount} items
            </Badge>
            <Separator orientation="vertical" className="h-6" />
            <Button
              variant="outline"
              size="sm"
              onClick={onCopy}
              disabled={data.length === 0}
              className="gap-2 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 bg-transparent"
            >
              {copySuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden min-h-0">
        <div className="h-full bg-slate-900 rounded-lg overflow-auto">
          <pre className="text-xs text-slate-100 p-4 whitespace-pre-wrap leading-relaxed font-mono">{displayText}</pre>
        </div>
      </CardContent>
    </Card>
  )
}
