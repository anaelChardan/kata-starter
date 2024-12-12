// OrderMarsRoverService.test.ts
import { Cardinal } from '../src/cardinal'
import { Instruction, Order } from '../src/order';
import { OrderMarsRoverService } from '../src/order-mars-service';
import { Position } from '../src/position';

describe('OrderMarsRoverService', () => {
    let sut: OrderMarsRoverService;

    beforeEach(() => {
        sut = new OrderMarsRoverService();
    });

    test('the rover keeps its position with no particular instruction', () => {
        sut.order(new Order(new Position(1, 2, Cardinal.North), []));

        const expected = new Position(1, 2, Cardinal.North);
        expect(sut.currentPositions()[0]).toEqual(expected);
    });

    test.each(moveForwardProvider())('the rover moves forward heading %s', (originDirection, destinationPosition) => {
        sut.order(new Order(new Position(3, 3, originDirection), [Instruction.Move]));

        expect(sut.currentPositions()[0]).toEqual(destinationPosition);
    });

    test.each(turnLeftProvider())('the rover turns left from %s to %s', (origin, destination) => {
        sut.order(new Order(new Position(1, 2, origin), [Instruction.Left]));

        const expected = new Position(1, 2, destination);
        expect(sut.currentPositions()[0]).toEqual(expected);
    });

    test('the rover follows several instructions', () => {
        sut.order(new Order(new Position(3, 3, Cardinal.East), [
            Instruction.Move,
            Instruction.Move,
            Instruction.Right,
            Instruction.Move,
            Instruction.Move,
            Instruction.Right,
            Instruction.Move,
            Instruction.Right,
            Instruction.Right,
            Instruction.Move,
        ]));

        const expected = new Position(5, 1, Cardinal.East);
        expect(sut.currentPositions()[0]).toEqual(expected);
    });

    test('several rovers are ordered', () => {
        sut.order(
            new Order(new Position(1, 2, Cardinal.North), [
                Instruction.Left,
                Instruction.Move,
                Instruction.Left,
                Instruction.Move,
                Instruction.Left,
                Instruction.Move,
                Instruction.Left,
                Instruction.Move,
                Instruction.Move,
            ]),
            new Order(new Position(3, 3, Cardinal.East), [
                Instruction.Move,
                Instruction.Move,
                Instruction.Right,
                Instruction.Move,
                Instruction.Move,
                Instruction.Right,
                Instruction.Move,
                Instruction.Right,
                Instruction.Right,
                Instruction.Move,
            ])
        );

        const actual = sut.currentPositions();

        const expected1 = new Position(1, 3, Cardinal.North);
        const expected2 = new Position(5, 1, Cardinal.East);
        expect(actual).toHaveLength(2);
        expect(actual[0]).toEqual(expected1);
        expect(actual[1]).toEqual(expected2);
    });

    test.each(turnRightProvider())('the rover turns right from %s to %s', (origin, destination) => {
        sut.order(new Order(new Position(1, 2, origin), [Instruction.Right]));

        const expected = new Position(1, 2, destination);
        expect(sut.currentPositions()[0]).toEqual(expected);
    });

    function moveForwardProvider() {
        return [
            [Cardinal.North, new Position(3, 4, Cardinal.North)],
            [Cardinal.West, new Position(2, 3, Cardinal.West)],
            [Cardinal.South, new Position(3, 2, Cardinal.South)],
            [Cardinal.East, new Position(4, 3, Cardinal.East)],
        ] as const;
    }

    function turnLeftProvider() {
        return [
            [Cardinal.North, Cardinal.West],
            [Cardinal.West, Cardinal.South],
            [Cardinal.South, Cardinal.East],
            [Cardinal.East, Cardinal.North],
        ];
    }

    function turnRightProvider() {
        return [
            [Cardinal.North, Cardinal.East],
            [Cardinal.East, Cardinal.South],
            [Cardinal.South, Cardinal.West],
            [Cardinal.West, Cardinal.North],
        ];
    }
});