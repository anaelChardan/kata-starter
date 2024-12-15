import { left, move, Position, right } from "./position";
import { Order, Instruction } from "./order";

export type OrderMarsRoverService = {
  order: (...orders: Order[]) => void;
  currentPositions: () => Position[];
};

function followInstructionsFromPosition(
  instructions: Instruction[],
  position: Position
): Position {
  return instructions.reduce((position, instruction) => {
    if (instruction === "M") {
      return move(position);
    }
    if (instruction === "L") {
      return left(position);
    }

    return right(position);
  }, position);
}

export function buildOrderMarsRoverService(
  positions: Position[]
): OrderMarsRoverService {
  const localPositions = positions;

  function order(...orders: Order[]): void {
    orders.forEach((order, index) => {
      const position = followInstructionsFromPosition(
        order.instructions,
        order.initialPosition
      );
      localPositions[index] = position;
    });
  }

  return {
    order,
    currentPositions: () => localPositions,
  };
}
