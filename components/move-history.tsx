"use client"

import type { Move } from "@/lib/chess-types"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MoveHistoryProps {
  moves: Move[]
}

export function MoveHistory({ moves }: MoveHistoryProps) {
  // Group moves into pairs (white, black)
  const movePairs: Array<{ white: Move; black?: Move }> = []
  for (let i = 0; i < moves.length; i += 2) {
    movePairs.push({
      white: moves[i],
      black: moves[i + 1],
    })
  }

  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold mb-3 text-foreground">Move History</h3>
      <ScrollArea className="h-[400px]">
        <div className="space-y-1">
          {movePairs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No moves yet</p>
          ) : (
            movePairs.map((pair, index) => (
              <div key={index} className="flex items-center gap-3 text-sm font-mono">
                <span className="text-muted-foreground w-8">{index + 1}.</span>
                <span className="text-foreground w-16">{pair.white.notation}</span>
                {pair.black && <span className="text-foreground w-16">{pair.black.notation}</span>}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  )
}
