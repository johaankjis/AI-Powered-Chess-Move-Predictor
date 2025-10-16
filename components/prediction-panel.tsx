"use client"

import type { MovePrediction } from "@/lib/chess-types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Activity, Shield } from "lucide-react"

interface PredictionPanelProps {
  prediction: MovePrediction | null
  isLoading?: boolean
}

export function PredictionPanel({ prediction, isLoading }: PredictionPanelProps) {
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">AI Prediction</h3>
            <Badge variant="outline" className="animate-pulse">
              Analyzing...
            </Badge>
          </div>
          <div className="h-32 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </Card>
    )
  }

  if (!prediction) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">AI Prediction</h3>
          <p className="text-sm text-muted-foreground">Make a move to see AI predictions</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">AI Prediction</h3>
          <Badge variant="default" className="bg-primary">
            {prediction.confidence}% confident
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Suggested Move</span>
            <span className="text-2xl font-bold font-mono text-primary">{prediction.move}</span>
          </div>
          <Progress value={prediction.confidence} className="h-2" />
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Position Evaluation</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
              <TrendingUp className="w-4 h-4 text-chart-1" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Material</p>
                <p className="text-sm font-semibold font-mono text-foreground">
                  {prediction.features.materialBalance > 0 ? "+" : ""}
                  {prediction.features.materialBalance}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
              <Activity className="w-4 h-4 text-chart-2" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Center</p>
                <p className="text-sm font-semibold font-mono text-foreground">
                  {prediction.features.centerControl > 0 ? "+" : ""}
                  {prediction.features.centerControl}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
              <TrendingDown className="w-4 h-4 text-chart-3" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Mobility</p>
                <p className="text-sm font-semibold font-mono text-foreground">{prediction.features.pieceMobility}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
              <Shield className="w-4 h-4 text-chart-4" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">King Safety</p>
                <p className="text-sm font-semibold font-mono text-foreground">{prediction.features.kingSafety}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Evaluation</span>
            <span
              className={`font-semibold font-mono ${prediction.evaluation > 0 ? "text-chart-3" : prediction.evaluation < 0 ? "text-destructive" : "text-muted-foreground"}`}
            >
              {prediction.evaluation > 0 ? "+" : ""}
              {prediction.evaluation}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
