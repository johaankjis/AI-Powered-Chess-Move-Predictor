import type { ChessBoard, ChessPiece, PieceColor, GameState, MovePrediction } from "./chess-types"

// Initialize a standard chess board
export function initializeBoard(): ChessBoard {
  const board: ChessBoard = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null))

  // Setup pawns
  for (let i = 0; i < 8; i++) {
    board[1][i] = { type: "pawn", color: "black" }
    board[6][i] = { type: "pawn", color: "white" }
  }

  // Setup other pieces
  const backRow: Array<ChessPiece["type"]> = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"]
  for (let i = 0; i < 8; i++) {
    board[0][i] = { type: backRow[i], color: "black" }
    board[7][i] = { type: backRow[i], color: "white" }
  }

  return board
}

// Convert board position to algebraic notation
export function toAlgebraicNotation(row: number, col: number): string {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"]
  const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"]
  return files[col] + ranks[row]
}

// Calculate material balance
export function calculateMaterialBalance(board: ChessBoard): number {
  const pieceValues: Record<ChessPiece["type"], number> = {
    pawn: 1,
    knight: 3,
    bishop: 3,
    rook: 5,
    queen: 9,
    king: 0,
  }

  let balance = 0
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col]
      if (piece) {
        const value = pieceValues[piece.type]
        balance += piece.color === "white" ? value : -value
      }
    }
  }
  return balance
}

// Calculate center control score
export function calculateCenterControl(board: ChessBoard): number {
  const centerSquares = [
    [3, 3],
    [3, 4],
    [4, 3],
    [4, 4],
  ]

  let score = 0
  for (const [row, col] of centerSquares) {
    const piece = board[row][col]
    if (piece) {
      score += piece.color === "white" ? 1 : -1
    }
  }
  return score
}

// Calculate piece mobility (simplified)
export function calculatePieceMobility(board: ChessBoard, color: PieceColor): number {
  let mobility = 0
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col]
      if (piece && piece.color === color) {
        // Simplified mobility calculation
        mobility += getPieceMobilityScore(piece.type)
      }
    }
  }
  return mobility
}

function getPieceMobilityScore(type: ChessPiece["type"]): number {
  const scores: Record<ChessPiece["type"], number> = {
    pawn: 1,
    knight: 8,
    bishop: 13,
    rook: 14,
    queen: 27,
    king: 8,
  }
  return scores[type]
}

// Simulate ML model prediction
export function predictBestMove(gameState: GameState): MovePrediction {
  const { board, currentTurn, moveNumber } = gameState

  // Calculate features
  const materialBalance = calculateMaterialBalance(board)
  const centerControl = calculateCenterControl(board)
  const pieceMobility = calculatePieceMobility(board, currentTurn)
  const kingSafety = Math.random() * 10 // Simulated

  // Generate a plausible move (simplified)
  const moves = generatePossibleMoves(board, currentTurn)
  const selectedMove = moves[Math.floor(Math.random() * moves.length)]

  // Simulate confidence based on features
  const confidence = Math.min(95, 70 + Math.random() * 25)
  const evaluation = materialBalance + centerControl * 0.5 + pieceMobility * 0.1

  return {
    move: selectedMove,
    confidence: Math.round(confidence * 10) / 10,
    evaluation: Math.round(evaluation * 100) / 100,
    features: {
      materialBalance: Math.round(materialBalance * 100) / 100,
      centerControl: Math.round(centerControl * 100) / 100,
      pieceMobility: Math.round(pieceMobility * 100) / 100,
      kingSafety: Math.round(kingSafety * 100) / 100,
    },
  }
}

// Generate possible moves (simplified)
function generatePossibleMoves(board: ChessBoard, color: PieceColor): string[] {
  const moves: string[] = []
  const commonMoves = [
    "e4",
    "e5",
    "d4",
    "d5",
    "Nf3",
    "Nc3",
    "Bc4",
    "Bb5",
    "O-O",
    "Qe2",
    "Bg5",
    "Nbd2",
    "c3",
    "a3",
    "h3",
    "Re1",
  ]

  // Return a subset of common moves
  return commonMoves.slice(0, 5 + Math.floor(Math.random() * 5))
}

// Generate mock historical games
export function generateMockGames(count: number) {
  const games = []
  const players = [
    "Magnus Carlsen",
    "Hikaru Nakamura",
    "Fabiano Caruana",
    "Ding Liren",
    "Ian Nepomniachtchi",
    "Alireza Firouzja",
  ]

  for (let i = 0; i < count; i++) {
    const whitePlayer = players[Math.floor(Math.random() * players.length)]
    let blackPlayer = players[Math.floor(Math.random() * players.length)]
    while (blackPlayer === whitePlayer) {
      blackPlayer = players[Math.floor(Math.random() * players.length)]
    }

    games.push({
      id: `game-${i + 1}`,
      whitePlayer,
      blackPlayer,
      whiteElo: 2700 + Math.floor(Math.random() * 150),
      blackElo: 2700 + Math.floor(Math.random() * 150),
      moves: generateMockMoveSequence(),
      result: ["white", "black", "draw"][Math.floor(Math.random() * 3)] as "white" | "black" | "draw",
      date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    })
  }

  return games
}

function generateMockMoveSequence(): string[] {
  const openings = [
    ["e4", "e5", "Nf3", "Nc6", "Bb5"],
    ["d4", "d5", "c4", "e6", "Nc3"],
    ["e4", "c5", "Nf3", "d6", "d4"],
    ["Nf3", "Nf6", "c4", "g6", "Nc3"],
  ]

  const opening = openings[Math.floor(Math.random() * openings.length)]
  const moveCount = 20 + Math.floor(Math.random() * 40)
  const moves = [...opening]

  const commonMoves = ["Nf3", "Nc3", "Bc4", "Bb5", "O-O", "Qe2", "Bg5", "Re1", "Rad1", "Rfe1"]

  for (let i = opening.length; i < moveCount; i++) {
    moves.push(commonMoves[Math.floor(Math.random() * commonMoves.length)])
  }

  return moves
}
