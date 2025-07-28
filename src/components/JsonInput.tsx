"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Database, AlertCircle } from "lucide-react"

interface JsonInputProps {
  value: string
  onChange: (value: string) => void
  itemCount: number
  error?: string
}

export const JsonInput = ({ value, onChange, itemCount, error }: JsonInputProps) => {
  return (
    <Card className="shadow-sm border-slate-200 h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-slate-700">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Database className="w-4 h-4 text-blue-600" />
          </div>
          JSON Data
          {itemCount > 0 && (
            <Badge variant="secondary" className="ml-auto bg-green-100 text-green-700 border-green-200">
              {itemCount} items
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Paste your JSON array here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-48 font-mono text-sm resize-none border-slate-200 focus:border-blue-300 focus:ring-blue-200"
        />
        {error && (
          <div className="flex items-center gap-2 mt-3 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
