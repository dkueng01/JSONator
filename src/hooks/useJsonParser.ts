"use client"

import { useState, useEffect } from "react"

export const useJsonParser = (input: string) => {
  const [parsedData, setParsedData] = useState<any[]>([])
  const [parseError, setParseError] = useState("")

  useEffect(() => {
    if (!input.trim()) {
      setParsedData([])
      setParseError("")
      return
    }

    try {
      const parsed = JSON.parse(input)
      if (Array.isArray(parsed)) {
        setParsedData(parsed)
        setParseError("")
      } else {
        setParseError("Input must be an array")
        setParsedData([])
      }
    } catch (error) {
      setParseError("Invalid JSON format")
      setParsedData([])
    }
  }, [input])

  return { parsedData, parseError }
}
