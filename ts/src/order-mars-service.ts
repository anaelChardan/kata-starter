import { Position } from './position';
import { Order, Instruction } from './order';

export class OrderMarsRoverService {
    private positions: Position[] = [];

    order(...orders: Order[]): void {
        orders.forEach((order, index) => {
            const position = this.followInstructionsFromPosition(order.instructions, order.initialPosition);
            this.positions[index] = position;
        });
    }

    currentPositions(): Position[] {
        return this.positions;
    }

    private followInstructionsFromPosition(instructions: Instruction[], position: Position): Position {
        instructions.forEach(instruction => {
            position = instruction === Instruction.Move ? position.move() :
                       instruction === Instruction.Left ? position.left() :
                       position.right();
        });

        return position;
    }
}