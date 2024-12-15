import { promises as fs } from "fs";
import { Position } from "./position";
import { cardinalFrom } from "./cardinal";

type MarsRoverJsonRepository = {
  add: (position: Position) => Promise<void>;
  get: (index: number) => Promise<Position>;
};

export function buildMarsRoverJsonRepository(
  filename: string
): MarsRoverJsonRepository {
  return {
    add: async (position: Position) => {
      const fileContent = await fs
        .readFile(filename, "utf-8")
        .catch(() => "[]");
      const actualPositions = JSON.parse(fileContent) as Position[];
      actualPositions.push(position);

      await fs.writeFile(filename, JSON.stringify(actualPositions));
    },
    get: async (index: number) => {
      const fileContent = await fs
        .readFile(filename, "utf-8")
        .catch(() => "[]");
      const positions = JSON.parse(fileContent) as Position[];
      return positions[index];
    },
  };
}
