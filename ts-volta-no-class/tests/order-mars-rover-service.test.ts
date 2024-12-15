import { describe, expect, test, beforeEach } from "vitest";
import {
  buildOrderMarsRoverService,
  OrderMarsRoverService,
} from "../src/order-mars-service";
import { Cardinal } from "../src/cardinal";
import { Instruction, Order } from "../src/order";
import { Position } from "../src/position";

describe("OrderMarsRoverService", () => {
  let sut: OrderMarsRoverService;

  beforeEach(() => {
    sut = buildOrderMarsRoverService([]);
  });

  test("the rover keeps its position with no particular instruction", () => {
    sut.order({
      initialPosition: { x: 1, y: 2, direction: "N" },
      instructions: [],
    });

    const expected = { x: 1, y: 2, direction: "N" };
    expect(sut.currentPositions()[0]).toEqual(expected);
  });

  test.each(moveForwardProvider())(
    "the rover moves forward heading %s",
    (originDirection, destinationPosition) => {
      sut.order({
        initialPosition: { x: 3, y: 3, direction: originDirection },
        instructions: ["M"],
      });

      expect(sut.currentPositions()[0]).toEqual(destinationPosition);
    }
  );

  test.each(turnLeftProvider())(
    "the rover turns left from %s to %s",
    (origin, destination) => {
      sut.order({
        initialPosition: { x: 1, y: 2, direction: origin },
        instructions: ["L"],
      });

      const expected = { x: 1, y: 2, direction: destination };
      expect(sut.currentPositions()[0]).toEqual(expected);
    }
  );

  test("the rover follows several instructions", () => {
    sut.order({
      initialPosition: { x: 3, y: 3, direction: "E" },
      instructions: ["M", "M", "R", "M", "M", "R", "M", "R", "R", "M"],
    });

    const expected = { x: 5, y: 1, direction: "E" };
    expect(sut.currentPositions()[0]).toEqual(expected);
  });

  test("several rovers are ordered", () => {
    sut.order(
      {
        initialPosition: { x: 1, y: 2, direction: "N" },
        instructions: ["L", "M", "L", "M", "L", "M", "M"],
      },
      {
        initialPosition: { x: 3, y: 3, direction: "E" },
        instructions: ["M", "M", "R", "M", "M", "R", "M", "R", "R", "M"],
      }
    );

    const actual = sut.currentPositions();

    const expected1 = { x: 1, y: 3, direction: "N" };
    const expected2 = { x: 5, y: 1, direction: "E" };
    expect(actual).toHaveLength(2);
    expect(actual[0]).toEqual(expected1);
    expect(actual[1]).toEqual(expected2);
  });

  test.each(turnRightProvider())(
    "the rover turns right from %s to %s",
    (origin, destination) => {
      sut.order({
        initialPosition: { x: 1, y: 2, direction: origin },
        instructions: ["R"],
      });

      const expected = { x: 1, y: 2, direction: destination };
      expect(sut.currentPositions()[0]).toEqual(expected);
    }
  );

  function moveForwardProvider(): [Cardinal, Position][] {
    return [
      ["N", { x: 3, y: 4, direction: "N" }],
      ["W", { x: 2, y: 3, direction: "W" }],
      ["S", { x: 3, y: 2, direction: "S" }],
      ["E", { x: 4, y: 3, direction: "E" }],
    ] as const;
  }

  function turnLeftProvider(): [Cardinal, Cardinal][] {
    return [
      ["N", "W"],
      ["W", "S"],
      ["S", "E"],
      ["E", "N"],
    ];
  }

  function turnRightProvider(): [Cardinal, Cardinal][] {
    return [
      ["N", "E"],
      ["E", "S"],
      ["S", "W"],
      ["W", "N"],
    ];
  }
});
