export type Cardinal = "N" | "W" | "S" | "E";

export function cardinalFrom(direction: string): Cardinal {
  switch (direction) {
    case "N":
    case "E":
    case "S":
    case "W":
      return direction;
    default:
      throw new Error(`Invalid cardinal direction: ${direction}`);
  }
}
