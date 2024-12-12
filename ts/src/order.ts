import { Position } from './position';

export class Order {
    constructor(public initialPosition: Position, public instructions: Instruction[]) {}
}

export enum Instruction {
    Move = 'M',
    Left = 'L',
    Right = 'R',
}

export function instructionFrom(char: string): Instruction {
    switch (char) {
        case 'M':
            return Instruction.Move;
        case 'L':
            return Instruction.Left;
        case 'R':
            return Instruction.Right;
        default:
            throw new Error('Invalid instruction');
    }
}