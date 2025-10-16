"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChessBoard } from "@/components/chess-board"
import { PredictionPanel } from "@/components/prediction-panel"
import { MoveHistory } from "@/components/move-history"
import { GameControls } from "@/components/game-controls"
import { PlayerInfo } from "@/components/player-info"
import { ModelInfoCard } from "@/components/model-info-card"
import { Button } from "@/components/ui/button"
import { initializeBoard } from "@/lib/chess-engine"
import type { GameState, MovePrediction } from "@/lib/chess-types"
import { BarChart3, History, User } from "lucide-react"

export default function HomePage() {
  const [gameState, setGameState] = useState<GameState>({
    board: initializeBoard(),
    currentTurn: "white",
    moveHistory: [],
    whiteElo: 1500,
    blackElo: 1500,
    moveNumber: 1,
  })

  const [prediction, setPrediction] = useState<MovePrediction | null>(null)
  const [predictionsEnabled, setPredictionsEnabled] = useState(true)
  const [isLoadingPrediction, setIsLoadingPrediction] = useState(false)
  const [selectedSquare, setSelectedSquare] = useState<{ row: number; col: number } | null>(null)

  useEffect(() => {
    if (predictionsEnabled && gameState.moveHistory.length >= 0) {
      setIsLoadingPrediction(true)

      fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gameState),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setPrediction(data.prediction)
            console.log("[v0] Prediction latency:", data.latency, "ms")
          }
          setIsLoadingPrediction(false)
        })
        .catch((error) => {
          console.error("[v0] Prediction error:", error)
          setIsLoadingPrediction(false)
        })
    }
  }, [gameState, predictionsEnabled])

  const handleNewGame = () => {
    setGameState({
      board: initializeBoard(),
      currentTurn: "white",
      moveHistory: [],
      whiteElo: 1500,
      blackElo: 1500,
      moveNumber: 1,
    })
    setPrediction(null)
    setSelectedSquare(null)
  }

  const handleSquareClick = (row: number, col: number) => {
    setSelectedSquare({ row, col })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">♔</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">ChessAI</h1>
            </div>
            <nav className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/history">
                  <History className="w-4 h-4 mr-2" />
                  History
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/analytics">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/players">
                  <User className="w-4 h-4 mr-2" />
                  Players
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Board and Controls */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <PlayerInfo
                color="black"
                name="AI Opponent"
                elo={gameState.blackElo}
                isCurrentTurn={gameState.currentTurn === "black"}
              />

              <div className="flex justify-center">
                <ChessBoard board={gameState.board} onSquareClick={handleSquareClick} selectedSquare={selectedSquare} />
              </div>

              <PlayerInfo
                color="white"
                name="You"
                elo={gameState.whiteElo}
                isCurrentTurn={gameState.currentTurn === "white"}
              />
            </div>

            <ModelInfoCard />
          </div>

          {/* Right Column - Predictions and History */}
          <div className="space-y-6">
            <PredictionPanel prediction={prediction} isLoading={isLoadingPrediction} />
            <GameControls
              onNewGame={handleNewGame}
              onTogglePredictions={() => setPredictionsEnabled(!predictionsEnabled)}
              predictionsEnabled={predictionsEnabled}
            />
            <MoveHistory moves={gameState.moveHistory} />
          </div>
        </div>
      </main>
    </div>
  )
}
