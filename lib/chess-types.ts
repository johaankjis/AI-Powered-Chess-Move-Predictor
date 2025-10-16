// Chess piece types and board representation
export type PieceType = "pawn" | "knight" | "bishop" | "rook" | "queen" | "king"
export type PieceColor = "white" | "black"

export interface ChessPiece {
  type: PieceType
  color: PieceColor
}

export type BoardPosition = ChessPiece | null
export type ChessBoard = BoardPosition[][]

export interface Move {
  from: { row: number; col: number }
  to: { row: number; col: number }
  piece: ChessPiece
  captured?: ChessPiece
  notation: string
}

export interface GameState {
  board: ChessBoard
  currentTurn: PieceColor
  moveHistory: Move[]
  whiteElo: number
  blackElo: number
  moveNumber: number
}

export interface MovePrediction {
  move: string
  confidence: number
  evaluation: number
  features: {
    materialBalance: number
    centerControl: number
    pieceMobility: number
    kingSafety: number
  }
}

export interface HistoricalGame {
  id: string
  whitePlayer: string
  blackPlayer: string
  whiteElo: number
  blackElo: number
  moves: string[]
  result: "white" | "black" | "draw"
  date: string
}

export interface PlayerStats {
  name: string
  elo: number
  gamesPlayed: number
  wins: number
  losses: number
  draws: number
  accuracy: number
  favoriteOpenings: string[]
}
