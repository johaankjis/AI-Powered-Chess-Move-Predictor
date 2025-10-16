"use client"

import { Card } from "@/components/ui/card"
import { mockPlayerStats } from "@/lib/mock-data"

export function EloChart() {
  const maxElo = Math.max(...mockPlayerStats.map((p) => p.elo))
  const minElo = Math.min(...mockPlayerStats.map((p) => p.elo))
  const range = maxElo - minElo

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6 text-foreground">Elo Rating Comparison</h3>
      <div className="space-y-6">
        <div className="flex items-end justify-between gap-4 h-64">
          {mockPlayerStats.map((player) => {
            const height = ((player.elo - minElo) / range) * 100
            return (
              <div key={player.name} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col justify-end h-full">
                  <div
                    className="w-full bg-primary rounded-t-lg transition-all hover:brightness-110"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-foreground">{player.elo}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[80px]">{player.name.split(" ")[0]}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
