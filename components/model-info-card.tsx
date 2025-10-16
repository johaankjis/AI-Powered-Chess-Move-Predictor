"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Database, Zap, Calendar } from "lucide-react"

interface ModelInfo {
  name: string
  version: string
  architecture: string
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  trainingGames: number
  latency: number
  lastUpdated: string
}

export function ModelInfoCard() {
  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("/api/model-info")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setModelInfo(data.model)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("[v0] Failed to fetch model info:", error)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-secondary rounded w-1/2" />
          <div className="h-4 bg-secondary rounded w-3/4" />
          <div className="h-4 bg-secondary rounded w-2/3" />
        </div>
      </Card>
    )
  }

  if (!modelInfo) {
    return null
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground">{modelInfo.name}</h3>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              v{modelInfo.version}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{modelInfo.architecture}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Activity className="w-4 h-4" />
              <span className="text-xs">Accuracy</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{modelInfo.accuracy}%</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Zap className="w-4 h-4" />
              <span className="text-xs">Latency</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{modelInfo.latency}ms</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Database className="w-4 h-4" />
              <span className="text-xs">Training Games</span>
            </div>
            <p className="text-lg font-bold text-foreground">{modelInfo.trainingGames.toLocaleString()}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="text-xs">F1 Score</span>
            </div>
            <p className="text-lg font-bold text-foreground">{modelInfo.f1Score}%</p>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Precision:</span>
              <span className="ml-2 font-semibold text-foreground">{modelInfo.precision}%</span>
            </div>
            <div>
              <span className="text-muted-foreground">Recall:</span>
              <span className="ml-2 font-semibold text-foreground">{modelInfo.recall}%</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Last updated: {new Date(modelInfo.lastUpdated).toLocaleDateString()}
        </div>
      </div>
    </Card>
  )
}
