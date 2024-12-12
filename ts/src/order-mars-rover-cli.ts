import {OrderMarsRoverService} from './order-mars-service';
import {Position} from './position';
import {Instruction, instructionFrom, Order} from './order';
import {cardinalFrom} from './cardinal';

export class OrderMarsRoverCli {

    constructor(private orderMarsRoverService: OrderMarsRoverService) {}

    public run(orders: string): void {

        const parsedOrders = this.parseOrders(orders);
        this.orderMarsRoverService.order(...parsedOrders);

        console.log('\nOrders sent to the rovers...\n');
        console.log('Rovers in positions:');
        this.orderMarsRoverService.currentPositions().forEach(position => {
            console.log(position.toString());
        });
    }

    private parseOrders(input: string): Order[] {
        const rawOrders = input.trim().split(/\r?\n/);
        const orders: Order[] = [];

        for (let i = 0; i < rawOrders.length; i += 2) {
            const position = this.parsePosition(rawOrders[i]);
            const instructions = this.parseInstructions(rawOrders[i + 1]);
            orders.push(new Order(position, instructions));
        }

        return orders;
    }

    private parsePosition(input: string): Position {
        const [x, y, direction] = input.split(' ');

        return new Position(parseInt(x), parseInt(y), cardinalFrom(direction));
    }

    private parseInstructions(input: string): Instruction[] {
        return input.split('').map(char => {
            return instructionFrom(char);
        });
    }
}