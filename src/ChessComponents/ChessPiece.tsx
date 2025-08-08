
import { Rule } from './Rule'
import { Board } from './Board'
import { Position } from './Position'

export class ChessPiece {
    image: string = '';
    order: number;
    movesMade: number = 0;
    other: Record<string, any> = {};
    onMoveCallbacks: ((from: Position, to: Position) => void)[] = [];
    onFriendCallbacks: ((from: Position, to: Position) => void)[] = [];

    constructor(order: number, image: string) {
        this.order = order;
        this.image = image;
    }

    getValidMoves(board: Board, position: Position): Position[] {
        return []
    }

    onMove(position: Position | null = null, board: Board): void {
        this.movesMade += 1;
    }

}