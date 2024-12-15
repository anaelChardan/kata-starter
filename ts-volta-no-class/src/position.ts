import { Cardinal } from "./cardinal";

export type Position = {
  x: number;
  y: number;
  direction: Cardinal;
};

export function move(position: Position): Position {
  const x =
    position.direction === "E"
      ? position.x + 1
      : position.direction === "W"
      ? position.x - 1
      : position.x;

  const y =
    position.direction === "N"
      ? position.y + 1
      : position.direction === "S"
      ? position.y - 1
      : position.y;

  return { x, y, direction: position.direction };
}

export function left(position: Position): Position {
  const direction =
    position.direction === "N"
      ? "W"
      : position.direction === "W"
      ? "S"
      : position.direction === "S"
      ? "E"
      : "N";

  return { ...position, direction };
}

export function right(position: Position): Position {
  const direction =
    position.direction === "N"
      ? "E"
      : position.direction === "E"
      ? "S"
      : position.direction === "S"
      ? "W"
      : "N";

  return { ...position, direction };
}

export function toJSON(position: Position): object {
  return {
    x: position.x,
    y: position.y,
    direction: position.direction,
  };
}

export function toString(position: Position): string {
  return `${position.x} ${position.y} ${position.direction}`;
}
