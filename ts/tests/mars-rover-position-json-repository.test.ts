import { promises as fs } from 'fs';
import { MarsRoverPositionJsonRepository } from '../src/mars-rover-position-json-repository';
import { Position } from '../src/position';
import { Cardinal } from '../src/cardinal';

describe('MarsRoverPositionJsonRepository', () => {
    let filename: string;

    beforeEach(async () => {
        filename = `${process.env.TEMP || '/tmp'}/mars-rover-positions-${Date.now()}.json`;
        await fs.writeFile(filename, '[]');
    });

    afterEach(async () => {
        if (await fileExists(filename)) {
            await fs.unlink(filename);
        }
    });

    test('it saves mars rover positions to a json file', async () => {
        const sut = new MarsRoverPositionJsonRepository(filename);

        await sut.add(new Position(0, 0, Cardinal.North));
        await sut.add(new Position(1, 0, Cardinal.East));
        await sut.add(new Position(1, -1, Cardinal.South));
        await sut.add(new Position(0, -1, Cardinal.West));

        await fileExists(filename);

        const fileContent = await fs.readFile(filename, 'utf-8');

        expect(JSON.parse(fileContent)).toEqual([
            { x: 0, y: 0, direction: 'N' },
            { x: 1, y: 0, direction: 'E' },
            { x: 1, y: -1, direction: 'S' },
            { x: 0, y: -1, direction: 'W' }
        ]);
    });

    test('it gets a mars rover position from a json file', async () => {
        await fs.writeFile(filename, JSON.stringify([
            { x: 0, y: 0, direction: 'N' },
            { x: 1, y: 0, direction: 'E' },
            { x: 1, y: -1, direction: 'S' },
            { x: 0, y: -1, direction: 'W' }
        ]));

        const sut = new MarsRoverPositionJsonRepository(filename);

        const position = await sut.get(1);

        expect(position).toEqual(new Position(1, 0, Cardinal.East));
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