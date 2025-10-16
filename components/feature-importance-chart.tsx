"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const featureImportance = [
  { name: "Elo Rating Difference", importance: 92 },
  { name: "Material Balance", importance: 85 },
  { name: "Center Control", importance: 78 },
  { name: "Piece Mobility", importance: 71 },
  { name: "King Safety", importance: 68 },
  { name: "Pawn Structure", importance: 62 },
  { name: "Piece Development", importance: 58 },
  { name: "Castling Rights", importance: 45 },
]

export function FeatureImportanceChart() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Feature Importance</h3>
      <div className="space-y-4">
        {featureImportance.map((feature) => (
          <div key={feature.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{feature.name}</span>
              <span className="font-semibold text-foreground">{feature.importance}%</span>
            </div>
            <Progress value={feature.importance} className="h-2" />
          </div>
        ))}
      </div>
    </Card>
  )
}
