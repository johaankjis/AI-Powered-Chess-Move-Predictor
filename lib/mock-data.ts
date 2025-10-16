import type { PlayerStats, HistoricalGame } from "./chess-types"
import { generateMockGames } from "./chess-engine"

export const mockPlayerStats: PlayerStats[] = [
  {
    name: "Magnus Carlsen",
    elo: 2830,
    gamesPlayed: 1247,
    wins: 892,
    losses: 143,
    draws: 212,
    accuracy: 94.2,
    favoriteOpenings: ["Ruy Lopez", "Italian Game", "Queen's Gambit"],
  },
  {
    name: "Hikaru Nakamura",
    elo: 2794,
    gamesPlayed: 1532,
    wins: 1043,
    losses: 201,
    draws: 288,
    accuracy: 92.8,
    favoriteOpenings: ["Sicilian Defense", "King's Indian", "Nimzo-Indian"],
  },
  {
    name: "Fabiano Caruana",
    elo: 2786,
    gamesPlayed: 1089,
    wins: 734,
    losses: 156,
    draws: 199,
    accuracy: 93.5,
    favoriteOpenings: ["Petroff Defense", "Berlin Defense", "Queen's Gambit"],
  },
  {
    name: "Ding Liren",
    elo: 2780,
    gamesPlayed: 967,
    wins: 651,
    losses: 134,
    draws: 182,
    accuracy: 92.1,
    favoriteOpenings: ["English Opening", "Catalan", "Grünfeld Defense"],
  },
]

export const mockHistoricalGames: HistoricalGame[] = generateMockGames(50)

export const mockModelMetrics = {
  accuracy: 82.4,
  precision: 84.1,
  recall: 80.7,
  f1Score: 82.3,
  trainingGames: 523847,
  latency: 147,
  lastUpdated: "2025-10-15T14:30:00Z",
}
