
import { ChessPiece } from '@/ChessComponents/ChessPiece';
import { Position } from '@/ChessComponents/Position';
import { Pawn } from '@/ChessComponents/Pawn';
import { Queen } from '@/ChessComponents/Queen';

export class Board {
    gameState: (ChessPiece | null)[][];
    constructor() {
       this.gameState = Array.from({ length: 8 }, () => 
            Array.from({ length: 8 }, () => null)
        );

        for(let i = 0; i < 8; i ++) {
            this.gameState[1][i] = new Pawn(1);
        }

        for(let i = 0; i < 8; i ++) {
            this.gameState[6][i] = new Pawn(0);
        }
        
        this.gameState[0][4] = new Queen(1);
        this.gameState[7][4] = new Queen(0);
    }

    isValidPosition(pos: Position): boolean {
        return pos.row >= 0 && pos.row < 8 && pos.col >= 0 && pos.col < 8;
    }

    getValidMoves(pos: Position) {
        const piece: ChessPiece | null = this.gameState[pos.row][pos.col]
        const validMoves = piece?.getValidMoves(this, pos);
        return validMoves ?? []
    }

    movePiece(origin: Position, target: Position) {
        const piece: ChessPiece | null = this.gameState[origin.row][origin.col];
        this.gameState[target.row][target.col] = piece;
        this.gameState[origin.row][origin.col] = null;
        piece?.onMove({row: target.row, col: target.col}, this);
    }

    getPiece(pos: Position) {
        if (!this.isValidPosition(pos)) return null;
        return this.gameState[pos.row][pos.col]
    }

    emptyAtPos(pos: Position) {
        if (!this.isValidPosition(pos)) return false;
        return (this.gameState[pos.row][pos.col] === null)
    }

    enemyAtPos(order: number,  pos: Position) {
        if (!this.isValidPosition(pos)) return false;
        if (this.gameState[pos.row][pos.col] === null) {
            return false;
        }

        const piece: ChessPiece | null = this.gameState[pos.row][pos.col];
        return order !== piece?.order 
    }

    friendAtPos(order: number,  pos: Position) {
        if (!this.isValidPosition(pos)) return false;
        if (this.gameState[pos.row][pos.col] === null) {
            return false;
        }

        const piece: ChessPiece | null = this.gameState[pos.row][pos.col];
        return order === piece?.order 
    }

    openSpotsInDirection(piece: ChessPiece, board: Board, position: Position, rowOffset: number, colOffset: number) {
        const spotsAvailable: Position[] = [];
        let pos: Position = {row: position.row + rowOffset, col: position.col + colOffset};
        while(true) {
            if (!this.isValidPosition(pos)) break; 
            else if (this.emptyAtPos(pos)) {
                spotsAvailable.push(pos);
            } 
            else if (this.enemyAtPos(piece.order, pos)) {
                spotsAvailable.push(pos);
                break;
            } else {
                break;
            }
            pos = {row: pos.row + rowOffset, col: pos.col + colOffset};
        }

        return spotsAvailable
    }

    swap(pos: Position, newPiece: ChessPiece) {
        this.gameState[pos.row][pos.col] = newPiece;
    }


}