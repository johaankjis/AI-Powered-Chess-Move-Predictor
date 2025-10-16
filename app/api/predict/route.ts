import { NextResponse } from "next/server"
import { predictBestMove } from "@/lib/chess-engine"
import type { GameState } from "@/lib/chess-types"

export async function POST(request: Request) {
  try {
    const gameState: GameState = await request.json()

    // Simulate ML model latency (147ms average as per specs)
    const latencyStart = Date.now()

    // Generate prediction
    const prediction = predictBestMove(gameState)

    // Ensure minimum realistic latency
    const elapsed = Date.now() - latencyStart
    if (elapsed < 100) {
      await new Promise((resolve) => setTimeout(resolve, 100 - elapsed))
    }

    return NextResponse.json({
      success: true,
      prediction,
      latency: Date.now() - latencyStart,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Prediction API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate prediction",
      },
      { status: 500 },
    )
  }
}
