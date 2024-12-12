import {OrderMarsRoverCli} from '../src/order-mars-rover-cli';
import {OrderMarsRoverService} from '../src/order-mars-service';

describe('OrderMarsRoverCli', () => {
    let command: OrderMarsRoverCli;
    let orderMarsRoverService: OrderMarsRoverService;

    beforeEach(() => {
        orderMarsRoverService = new OrderMarsRoverService();
        command = new OrderMarsRoverCli(orderMarsRoverService);
    });

    test('it orders rovers', () => {
        const orders = `1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

        const stdoutSpy = jest.spyOn(console, 'log').mockImplementation();

        command.run(orders);

        expect(stdoutSpy).toHaveBeenCalledWith("\nOrders sent to the rovers...\n");
        expect(stdoutSpy).toHaveBeenCalledWith('Rovers in positions:');
        expect(stdoutSpy).toHaveBeenCalledWith('1 3 N');
        expect(stdoutSpy).toHaveBeenCalledWith('5 1 E');

        stdoutSpy.mockRestore();
    });
});