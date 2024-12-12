export enum Cardinal {
    North = 'N',
    West = 'W',
    South = 'S',
    East = 'E',
}

export function cardinalFrom(direction: string): Cardinal {
    switch (direction) {
        case 'N':
            return Cardinal.North;
        case 'E':
            return Cardinal.East;
        case 'S':
            return Cardinal.South;
        case 'W':
            return Cardinal.West;
        default:
            throw new Error('Invalid cardinal direction');
    }
}