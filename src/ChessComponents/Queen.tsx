import { Board } from "./Board";
import { ChessPiece } from "./ChessPiece";
import { Position } from "./Position";

export class Queen extends ChessPiece {

    constructor(order: number) {
        super(order, 'Q');
    }

    onMove(position: Position | null = null, board: Board): void {
        super.onMove(position, board);

        const finishLine: number = (this.order == 0) ? 0 : 7;
    }

    getValidMoves(board: Board, position: Position): Position[] {
        const availableSpots = []
        availableSpots.push(board.openSpotsInDirection(this, board, position, 1, 1));
        availableSpots.push(board.openSpotsInDirection(this, board, position, 1, -1));
        availableSpots.push(board.openSpotsInDirection(this, board, position, -1, 1));
        availableSpots.push(board.openSpotsInDirection(this, board, position, -1, -1));
        availableSpots.push(board.openSpotsInDirection(this, board, position, 1, 0));
        availableSpots.push(board.openSpotsInDirection(this, board, position, -1, 0));
        availableSpots.push(board.openSpotsInDirection(this, board, position, 0, 1));
        availableSpots.push(board.openSpotsInDirection(this, board, position, 0, -1));
        return availableSpots.flatMap(arg => arg)
    }

}