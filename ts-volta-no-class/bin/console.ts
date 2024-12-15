import { Command } from "commander";
import { buildOrderMarsRoverCli } from "../src/order-mars-rover-cli";
import { buildOrderMarsRoverService } from "../src/order-mars-service";

const program = new Command();

const HELP = `
    This command allows you to order a series of rovers. For each rover, you must provide its initial position and a series of instructions.

    The initial position is composed of two integers and a cardinal letter. The integers represent the x and y coordinates of the rover. The cardinal letter represents the direction the rover is facing. The possible cardinal letters are: N (north), S (south), E (east) and W (west).

    The instructions are a series of letters. Each letter corresponds to an instruction. The possible instructions are: M (move forward), L (turn left) and R (turn right).'

For instance, to order 2 rovers, you would write:
    pnpm run start "1 2 N
        LMLMLMLMM
        3 3 E
        MMRMMR"
`;

program
  .name("order")
  .description("Orders a series of rovers.")
  .argument("<orders>", "Orders to send to the rovers")
  .description(HELP)
  .action((orders: string) => {
    const cli = buildOrderMarsRoverCli(buildOrderMarsRoverService([]));
    cli.run(orders);
  })
  .parse(process.argv);
