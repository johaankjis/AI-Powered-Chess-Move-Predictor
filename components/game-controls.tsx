"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RotateCcw, Play, Pause } from "lucide-react"

interface GameControlsProps {
  onNewGame: () => void
  onTogglePredictions: () => void
  predictionsEnabled: boolean
}

export function GameControls({ onNewGame, onTogglePredictions, predictionsEnabled }: GameControlsProps) {
  return (
    <Card className="p-4">
      <div className="space-y-3">
        <Button onClick={onNewGame} variant="outline" className="w-full bg-transparent" size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          New Game
        </Button>
        <Button
          onClick={onTogglePredictions}
          variant={predictionsEnabled ? "default" : "outline"}
          className="w-full"
          size="sm"
        >
          {predictionsEnabled ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {predictionsEnabled ? "Pause AI" : "Enable AI"}
        </Button>
      </div>
    </Card>
  )
}
