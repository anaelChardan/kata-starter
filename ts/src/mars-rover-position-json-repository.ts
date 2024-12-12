import {promises as fs} from 'fs';
import {Position} from './position';
import {cardinalFrom} from './cardinal';

export class MarsRoverPositionJsonRepository {
    constructor(private filename: string) {}

    async add(position: Position): Promise<void> {
        const fileContent = await fs.readFile(this.filename, 'utf-8').catch(() => '[]');
        const actualPositions = JSON.parse(fileContent) as Position[];
        actualPositions.push(position);

        await fs.writeFile(this.filename, JSON.stringify(actualPositions));
    }

    async get(index: number): Promise<Position> {
        const fileContent = await fs.readFile(this.filename, 'utf-8').catch(() => '[]');
        const positions = JSON.parse(fileContent) as { x: number, y: number, direction: string }[];
        const position = positions[index];

        return new Position(position.x, position.y, cardinalFrom(position.direction));
    }
}