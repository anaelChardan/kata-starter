import {
  buildOrderMarsRoverCli,
  OrderMarsRoverCli,
} from "../src/order-mars-rover-cli";
import {
  buildOrderMarsRoverService,
  OrderMarsRoverService,
} from "../src/order-mars-service";

import { describe, expect, beforeEach, test, vi } from "vitest";

describe("OrderMarsRoverCli", () => {
  let command: OrderMarsRoverCli;
  let orderMarsRoverService: OrderMarsRoverService;

  beforeEach(() => {
    orderMarsRoverService = buildOrderMarsRoverService([]);
    command = buildOrderMarsRoverCli(orderMarsRoverService);
  });

  test("it orders rovers", () => {
    const orders = `1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

    const stdoutSpy = vi
      .spyOn(console, "log")
      .mockImplementation(() => undefined);

    command.run(orders);

    expect(stdoutSpy).toHaveBeenCalledWith("\nOrders sent to the rovers...\n");
    expect(stdoutSpy).toHaveBeenCalledWith("Rovers in positions:");
    expect(stdoutSpy).toHaveBeenCalledWith("1 3 N");
    expect(stdoutSpy).toHaveBeenCalledWith("5 1 E");

    stdoutSpy.mockRestore();
  });
});
