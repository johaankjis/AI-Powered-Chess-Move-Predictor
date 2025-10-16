"use client"
import type { ChessPiece, PieceColor } from "@/lib/chess-types"
import { cn } from "@/lib/utils"

const pieceSymbols: Record<PieceColor, Record<ChessPiece["type"], string>> = {
  white: {
    king: "♔",
    queen: "♕",
    rook: "♖",
    bishop: "♗",
    knight: "♘",
    pawn: "♙",
  },
  black: {
    king: "♚",
    queen: "♛",
    rook: "♜",
    bishop: "♝",
    knight: "♞",
    pawn: "♟",
  },
}

export function ChessBoard({ board, onSquareClick, selectedSquare, highlightedSquares = [] }: any) {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"]
  const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"]

  const isSquareHighlighted = (row: number, col: number) => {
    return highlightedSquares.some((sq) => sq.row === row && sq.col === col)
  }

  const isSquareSelected = (row: number, col: number) => {
    return selectedSquare?.row === row && selectedSquare?.col === col
  }

  return (
    <div className="inline-block border border-border rounded-lg overflow-hidden">
      <div className="grid grid-cols-8 gap-0">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const isLight = (rowIndex + colIndex) % 2 === 0
            const isHighlighted = isSquareHighlighted(rowIndex, colIndex)
            const isSelected = isSquareSelected(rowIndex, colIndex)

            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => onSquareClick?.(rowIndex, colIndex)}
                className={cn(
                  "w-16 h-16 flex items-center justify-center text-5xl relative transition-colors",
                  isLight ? "bg-secondary/40" : "bg-secondary/80",
                  isHighlighted && "ring-2 ring-accent ring-inset",
                  isSelected && "ring-2 ring-primary ring-inset",
                  "hover:brightness-110",
                )}
              >
                {piece && (
                  <span className={cn("select-none", piece.color === "white" ? "text-white" : "text-muted")}>
                    {pieceSymbols[piece.color][piece.type]}
                  </span>
                )}
                {/* Coordinate labels */}
                {colIndex === 0 && (
                  <span className="absolute left-1 top-1 text-[10px] text-muted-foreground/50 font-mono">
                    {ranks[rowIndex]}
                  </span>
                )}
                {rowIndex === 7 && (
                  <span className="absolute right-1 bottom-1 text-[10px] text-muted-foreground/50 font-mono">
                    {files[colIndex]}
                  </span>
                )}
              </button>
            )
          }),
        )}
      </div>
    </div>
  )
}
