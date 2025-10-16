import { NextResponse } from "next/server"
import { mockModelMetrics } from "@/lib/mock-data"

export async function GET() {
  return NextResponse.json({
    success: true,
    model: {
      name: "ChessAI-v2.1",
      version: "2.1.0",
      architecture: "Random Forest + Positional Heuristics",
      ...mockModelMetrics,
    },
  })
}
