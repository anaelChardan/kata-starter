import { Position } from "./position";

export type Instruction = "M" | "L" | "R";

export type Order = {
  initialPosition: Position;
  instructions: Instruction[];
};

export function instructionFrom(char: string): Instruction {
  switch (char) {
    case "M":
    case "L":
    case "R":
      return char;
    default:
      throw new Error("Invalid instruction");
  }
}
