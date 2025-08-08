
import { Board } from './Board'
import { Position } from './Position'
import { ChessPiece } from './ChessPiece'
import { Queen } from './Queen'

export class Pawn extends ChessPiece {

    constructor(order: number) {
        super(order, 'P');
    }

    onMove(pos: Position | null = null, board: Board): void {
        super.onMove(pos, board);
        const finishLine: number = (this.order == 0) ? 0 : 7;

        if (finishLine == pos?.row) {
            board.swap(pos, new Queen(this.order))
        }
    }

    getValidMoves(board: Board, pos: Position) {
        const moves: Position[] = [];
        const forward = this.order == 1 ? 1 : -1;

        const singlePush: Position = {row: pos.row + forward, col: pos.col};
        const doublePush: Position = {row: pos.row + (forward * 2), col: pos.col};
        if (board.emptyAtPos(singlePush)) {
            moves.push(singlePush);
        }
        if (this.movesMade == 0 && board.emptyAtPos(singlePush) && board.emptyAtPos(doublePush)) {
            moves.push(doublePush);
        }

        const leftAttackPos: Position= {row: pos.row + forward, col: pos.col - 1};
        const rightAttackPos: Position = {row: pos.row + forward, col: pos.col + 1};
        if (board.enemyAtPos(this.order, leftAttackPos)) {
            moves.push(leftAttackPos);
        }
        if (board.enemyAtPos(this.order, rightAttackPos)) {
            moves.push(rightAttackPos);
        }

        return moves;
    }
}