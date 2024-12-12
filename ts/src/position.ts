import { Cardinal } from './cardinal';

export class Position {
    constructor(private x: number, private y: number, private direction: Cardinal) {}

    move(): Position {
        const x = this.direction === Cardinal.East ? this.x + 1 :
                  this.direction === Cardinal.West ? this.x - 1 : this.x;

        const y = this.direction === Cardinal.North ? this.y + 1 :
                  this.direction === Cardinal.South ? this.y - 1 : this.y;

        return new Position(x, y, this.direction);
    }

    left(): Position {
        const direction = this.direction === Cardinal.North ? Cardinal.West :
                          this.direction === Cardinal.West ? Cardinal.South :
                          this.direction === Cardinal.South ? Cardinal.East :
                          Cardinal.North;

        return new Position(this.x, this.y, direction);
    }

    right(): Position {
        const direction = this.direction === Cardinal.North ? Cardinal.East :
                          this.direction === Cardinal.East ? Cardinal.South :
                          this.direction === Cardinal.South ? Cardinal.West :
                          Cardinal.North;

        return new Position(this.x, this.y, direction);
    }

    toJSON(): object {
        return {
            x: this.x,
            y: this.y,
            direction: this.direction
        };
    }

    toString(): string {
        return `${this.x} ${this.y} ${this.direction}`;
    }
}