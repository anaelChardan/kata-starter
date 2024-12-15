import { OrderMarsRoverService } from "./order-mars-service";
import { Position } from "./position";
import { Instruction, instructionFrom, Order } from "./order";
import { cardinalFrom } from "./cardinal";

export type OrderMarsRoverCli = {
  run: (orders: string) => void;
};

function parseInstructions(input: string): Instruction[] {
  return input.split("").map((char) => {
    return instructionFrom(char);
  });
}

function parsePosition(input: string): Position {
  const [x, y, direction] = input.split(" ");

  return {
    x: parseInt(x),
    y: parseInt(y),
    direction: cardinalFrom(direction),
  };
}

function parseOrders(input: string): Order[] {
  console.log("INPUT", { input });
  const rawOrders = input
    .trim()
    .split(/\r?\n?\\n/)
    .map((line) => line.trim());

  console.log("RAW ORDERS", { rawOrders });
  const orders: Order[] = [];

  for (let i = 0; i < rawOrders.length; i += 2) {
    const initialPosition = parsePosition(rawOrders[i]);
    const instructions = parseInstructions(rawOrders[i + 1]);
    orders.push({ initialPosition, instructions });
  }

  return orders;
}

export function buildOrderMarsRoverCli(
  orderMarsRoverService: OrderMarsRoverService
): OrderMarsRoverCli {
  function run(orders: string): void {
    const parsedOrders = parseOrders(orders);
    orderMarsRoverService.order(...parsedOrders);

    console.log("\nOrders sent to the rovers...\n");
    console.log("Rovers in positions:");
    orderMarsRoverService.currentPositions().forEach((position) => {
      console.log(position);
    });
  }

  return { run };
}
