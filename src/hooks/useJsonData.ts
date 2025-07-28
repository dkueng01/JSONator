"use client"

import { useState, useEffect } from "react"
import { parseJsonArray } from "@/utils/validation"

export const useJsonData = (input: string) => {
  const [data, setData] = useState<any[]>([])
  const [error, setError] = useState<string>()

  useEffect(() => {
    const result = parseJsonArray(input)
    setData(result.data)
    setError(result.error)
  }, [input])

  return { data, error }
}
