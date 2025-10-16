"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User } from "lucide-react"

interface PlayerInfoProps {
  color: "white" | "black"
  name: string
  elo: number
  isCurrentTurn: boolean
}

export function PlayerInfo({ color, name, elo, isCurrentTurn }: PlayerInfoProps) {
  return (
    <Card className={`p-4 ${isCurrentTurn ? "ring-2 ring-primary" : ""}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${color === "white" ? "bg-white text-black" : "bg-black text-white"}`}
          >
            <User className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">Elo: {elo}</p>
          </div>
        </div>
        {isCurrentTurn && (
          <Badge variant="default" className="bg-primary">
            Your Turn
          </Badge>
        )}
      </div>
    </Card>
  )
}
