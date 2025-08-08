'use client';

import { useState, useCallback } from 'react';
import { Board } from '../ChessComponents/Board';
import { ChessPiece } from '@/ChessComponents/ChessPiece';
import { Position } from '@/ChessComponents/Position';

interface GameGridProps {
    letters: string[];
}

export default function GameGrid() {
    const [board, setBoard] = useState(() => new Board()); 
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedCells, setSelectedCells] = useState<number[]>([]);
    const [validMoves, setValidMoves] = useState<number[]>([]);

    const handleMouseDown = useCallback((index: number) => {
        const row = Math.floor(index / 8);
        const col = index % 8;
        console.log(validMoves);

        if (validMoves.length == 0) {
            const moves: Position[] = board.getValidMoves({row: row, col: col}) ?? [];
            const vmoves: number[] = [];

            for(const move of moves) {
                vmoves.push(move.row * 8 + move.col)
            }
            setSelectedCells([index]);
            setIsSelecting(true);
            setValidMoves(vmoves);
        } else {
            if (validMoves.includes(index)) {
                const srow = Math.floor(selectedCells[0] / 8);
                const scol = selectedCells[0] % 8;
                board.movePiece({row: srow, col: scol}, {row: row, col: col});
            }
            setIsSelecting(false);
            setSelectedCells([]);
            setValidMoves([]);
        }

        console.log(validMoves);


        

    }, [validMoves, selectedCells, board]);

    return (
        <div
            className="grid grid-cols-8 gap-0 max-w-xs select-none"
        >
            {Array.from({ length: 64 }, (_, index) => {
                const row = Math.floor(index / 8);
                const col = index % 8;
                const piece: ChessPiece | null = board.gameState[row][col]
                const isLight = (row + col) % 2 === 0;
                
                return (
                    <div
                        key={index}
                        className={`
                            w-10 h-10 border-2 border-gray-800 flex items-center justify-center 
                            text-xl font-bold transition-colors cursor-pointer select-none touch-none
                            ${isLight
                                ? 'bg-blue-200 hover:bg-blue-300' 
                                : 'bg-white hover:bg-gray-200'
                            }
                            ${selectedCells.includes(index) 
                                ? 'border-2 border-blue-500'  
                                : validMoves.includes(index) 
                                    ? 'border-2 border-red-500' 
                                    : 'border-2 border-none'
                            }
                            ${(piece?.order == 0) ? 'text-blue-500' : 'text-gray-950' }

                        `}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            handleMouseDown(index);
                        }}
                    >
                        {piece?.image ?? ''}
                    </div>
                );
            })}
        </div>
    );
}