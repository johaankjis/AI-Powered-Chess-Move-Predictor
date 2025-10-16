"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockPlayerStats } from "@/lib/mock-data"
import { ArrowLeft, Trophy, TrendingUp, Target } from "lucide-react"

export default function PlayersPage() {
  const sortedPlayers = [...mockPlayerStats].sort((a, b) => b.elo - a.elo)

  const getWinRate = (player: (typeof mockPlayerStats)[0]) => {
    return Math.round((player.wins / player.gamesPlayed) * 100)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
              </Button>
              <h1 className="text-xl font-bold text-foreground">Player Statistics</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Leaderboard */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Top Players</h2>
            </div>

            <div className="space-y-4">
              {sortedPlayers.map((player, index) => (
                <Card key={player.name} className="p-6 bg-secondary/30">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Rank and Basic Info */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{player.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="default" className="bg-primary">
                            {player.elo}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{player.gamesPlayed} games</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <TrendingUp className="w-3 h-3" />
                          <span className="text-xs">Win Rate</span>
                        </div>
                        <p className="text-xl font-bold text-chart-3">{getWinRate(player)}%</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Trophy className="w-3 h-3" />
                          <span className="text-xs">Wins</span>
                        </div>
                        <p className="text-xl font-bold text-foreground">{player.wins}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Target className="w-3 h-3" />
                          <span className="text-xs">Accuracy</span>
                        </div>
                        <p className="text-xl font-bold text-foreground">{player.accuracy}%</p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground">Record</span>
                        <p className="text-sm font-mono text-foreground">
                          {player.wins}W / {player.losses}L / {player.draws}D
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Favorite Openings */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Favorite Openings</p>
                    <div className="flex flex-wrap gap-2">
                      {player.favoriteOpenings.map((opening) => (
                        <Badge key={opening} variant="outline" className="text-xs">
                          {opening}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Detailed Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Elo Distribution */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Elo Distribution</h3>
              <div className="space-y-4">
                {sortedPlayers.map((player) => (
                  <div key={player.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{player.name}</span>
                      <span className="font-semibold text-primary">{player.elo}</span>
                    </div>
                    <Progress value={(player.elo / 3000) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Accuracy Comparison */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Accuracy Comparison</h3>
              <div className="space-y-4">
                {sortedPlayers.map((player) => (
                  <div key={player.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{player.name}</span>
                      <span className="font-semibold text-chart-2">{player.accuracy}%</span>
                    </div>
                    <Progress value={player.accuracy} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Performance Insights */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Performance Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="text-sm text-muted-foreground mb-1">Highest Elo</p>
                <p className="text-2xl font-bold text-foreground">{sortedPlayers[0].elo}</p>
                <p className="text-xs text-muted-foreground mt-1">{sortedPlayers[0].name}</p>
              </div>

              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="text-sm text-muted-foreground mb-1">Most Games</p>
                <p className="text-2xl font-bold text-foreground">
                  {Math.max(...sortedPlayers.map((p) => p.gamesPlayed))}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {
                    sortedPlayers.find((p) => p.gamesPlayed === Math.max(...sortedPlayers.map((p) => p.gamesPlayed)))
                      ?.name
                  }
                </p>
              </div>

              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="text-sm text-muted-foreground mb-1">Best Accuracy</p>
                <p className="text-2xl font-bold text-foreground">
                  {Math.max(...sortedPlayers.map((p) => p.accuracy))}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {sortedPlayers.find((p) => p.accuracy === Math.max(...sortedPlayers.map((p) => p.accuracy)))?.name}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="text-sm text-muted-foreground mb-1">Avg Win Rate</p>
                <p className="text-2xl font-bold text-foreground">
                  {Math.round(sortedPlayers.reduce((sum, p) => sum + getWinRate(p), 0) / sortedPlayers.length)}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">Across all players</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
