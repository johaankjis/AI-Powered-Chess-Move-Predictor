"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockHistoricalGames } from "@/lib/mock-data"
import { ArrowLeft, Search, Filter, Trophy, Users } from "lucide-react"

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [resultFilter, setResultFilter] = useState<string>("all")

  const filteredGames = mockHistoricalGames.filter((game) => {
    const matchesSearch =
      game.whitePlayer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.blackPlayer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesResult = resultFilter === "all" || game.result === resultFilter

    return matchesSearch && matchesResult
  })

  const getResultBadge = (result: string, perspective: "white" | "black") => {
    if (result === "draw") {
      return (
        <Badge variant="outline" className="bg-muted/50">
          Draw
        </Badge>
      )
    }
    if (result === perspective) {
      return (
        <Badge variant="default" className="bg-chart-3">
          Win
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="bg-destructive/20 text-destructive">
        Loss
      </Badge>
    )
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
              <h1 className="text-xl font-bold text-foreground">Game History</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Games</p>
                  <p className="text-2xl font-bold text-foreground">{mockHistoricalGames.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-chart-3" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Elo</p>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.round(
                      mockHistoricalGames.reduce((sum, g) => sum + g.whiteElo + g.blackElo, 0) /
                        (mockHistoricalGames.length * 2),
                    )}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Filter className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Filtered</p>
                  <p className="text-2xl font-bold text-foreground">{filteredGames.length}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Filters */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by player name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={resultFilter} onValueChange={setResultFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filter by result" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Results</SelectItem>
                  <SelectItem value="white">White Wins</SelectItem>
                  <SelectItem value="black">Black Wins</SelectItem>
                  <SelectItem value="draw">Draws</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Games List */}
          <div className="space-y-4">
            {filteredGames.map((game) => (
              <Card key={game.id} className="p-6 hover:bg-card/80 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-foreground">{game.whitePlayer}</span>
                          <Badge variant="outline" className="text-xs">
                            {game.whiteElo}
                          </Badge>
                          {getResultBadge(game.result, "white")}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{game.blackPlayer}</span>
                          <Badge variant="outline" className="text-xs">
                            {game.blackElo}
                          </Badge>
                          {getResultBadge(game.result, "black")}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{game.moves.length} moves</span>
                      <span>•</span>
                      <span>{new Date(game.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    View Analysis
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <Card className="p-12">
              <div className="text-center">
                <p className="text-muted-foreground">No games found matching your filters</p>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
