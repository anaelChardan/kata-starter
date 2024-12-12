# Mars Rover: tests and architecture kata

⚠️⚠️ Please, do not open the folder `tests/AlmostHidden` until asked to do so.

This kata is based on the traditional [Mars Rover kata](https://code.google.com/archive/p/marsrovertechchallenge/), but with a twist.

The implementation has already been coded. The CLI `KataStarter\OrderMarsRoverCli` allows to order several Mars rovers to make them move and turn.

## How to use?

1. Choose a language, and go to that folder.
2. Install the dependencies with `make install`.
3. Launch and play with the following commands to see how it works:

```php
// PHP
docker compose run --rm php bin/console order --help
```

or 

```ts
// TypeScript
make build && node dist/bin/console --help
```

The classes and tests are not organized (they are all directly in `src/` or `tests/`). It’s done on purpose to make you think about you’d structure such a project.

You're ready to learn!

## What's available?

### PHP

- PHP version 8.3 (using the [thecodingmachine](https://github.com/thecodingmachine/docker-images-php) Docker images)
- Phpunit version 11+
- Your tests should have the namespace `KataStarter\Test` and be in the `tests/` folder.
- Your production code should have the namespace `KataStarter` and be in the `src/` folder.

### Typescript

- Node version 23+
- Jest version 29+ with TS enabled

## Exercise 1

⏲ 20 minutes + 30 minutes debrief

How would you test the code present in `src`? 

- which tests classes would you create?
- what kind of tests would they contain?
- for each test class, write all the test cases you would test
- for each test class, implement one test case (pseudo-code is fine)
- what would be the test strategy?
- what would be the test coverage?

You can write pseudo-code or take shortcuts if you want. The code doesn't have to compile and tests don't have to be green.

## Exercise 2

⏲ 15 minutes + 35 minutes debrief

Now, let's have a look at the `tests/AlmostHidden` folder. It contains test classes that tests code. 

- How does it compare with your solution?
- What are the pros and cons of each approach?
- How would you organize the tests in the `tests` folder and the production code in the `src` folder?

## Exercise 3

Sending orders to Mars or receiving information from it can take a long time... That's why we need to be able to save the positions of the rovers somewhere, so that we can retrieve them later.

The CLI `order` must now only order the rovers (and not retrieve their positions). The new CLI `locate` must retrieve the positions of the rovers.

The `MarsRoverPositionsJsonRepository` class that has been provided is responsible for saving and retrieving the positions of the rovers in a JSON file. 

