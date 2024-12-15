import { promises as fs } from "fs";
import { describe, expect, beforeEach, afterEach, test } from "vitest";
import { buildMarsRoverJsonRepository } from "../src/mars-rover-position-json-repository";

describe("MarsRoverPositionJsonRepository", () => {
  let filename: string;

  beforeEach(async () => {
    filename = `${
      process.env.TEMP || "/tmp"
    }/mars-rover-positions-${Date.now()}.json`;
    await fs.writeFile(filename, "[]");
  });

  afterEach(async () => {
    if (await fileExists(filename)) {
      await fs.unlink(filename);
    }
  });

  test("it saves mars rover positions to a json file", async () => {
    const sut = buildMarsRoverJsonRepository(filename);

    await sut.add({ x: 0, y: 0, direction: "N" });
    await sut.add({ x: 1, y: 0, direction: "E" });
    await sut.add({ x: 1, y: -1, direction: "S" });
    await sut.add({ x: 0, y: -1, direction: "W" });

    await fileExists(filename);

    const fileContent = await fs.readFile(filename, "utf-8");

    expect(JSON.parse(fileContent)).toEqual([
      { x: 0, y: 0, direction: "N" },
      { x: 1, y: 0, direction: "E" },
      { x: 1, y: -1, direction: "S" },
      { x: 0, y: -1, direction: "W" },
    ]);
  });

  test("it gets a mars rover position from a json file", async () => {
    await fs.writeFile(
      filename,
      JSON.stringify([
        { x: 0, y: 0, direction: "N" },
        { x: 1, y: 0, direction: "E" },
        { x: 1, y: -1, direction: "S" },
        { x: 0, y: -1, direction: "W" },
      ])
    );

    const sut = buildMarsRoverJsonRepository(filename);

    const position = await sut.get(1);

    expect(position).toEqual({ x: 1, y: 0, direction: "E" });
  });

  async function fileExists(path: string): Promise<boolean> {
    try {
      await fs.access(path);
      return true;
    } catch {
      return false;
    }
  }
});
