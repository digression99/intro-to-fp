// time in do-notation version
import { log } from 'fp-ts/Console'
import { now } from 'fp-ts/Date'
import { pipe } from 'fp-ts/function'
import * as IO from 'fp-ts/IO'

// additional import
import { randomInt } from 'fp-ts/Random'
import { Monoid, concatAll } from 'fp-ts/Monoid'
import { replicate } from 'fp-ts/ReadonlyArray'

const time =
  <A>(ma: IO.IO<A>): IO.IO<A> =>
    pipe(
      IO.Do,
      IO.bind('startMillis', () => now),
      IO.bind('a', () => ma),
      IO.bind('endMillis', () => now),
      IO.chainFirst(({ endMillis, startMillis }) =>
        log(`Elapsed: ${endMillis - startMillis}`)
      ),
      IO.map(({ a }) => a)
    )

const fib = (n: number): number =>
  (n <= 1 ? 1 : fib(n - 1) + fib(n - 2))

const randomFib: IO.IO<void> = pipe(
  randomInt(30, 35),
  IO.chain(n => log([n, fib(n)]))
)

const MonoidIO: Monoid<IO.IO<void>> = {
  concat: (first, second) => () => {
    first()
    second()
  },
  empty: IO.of(undefined)
}

const replicateIO =
  (n: number, mv: IO.IO<void>): IO.IO<void> =>
    concatAll(MonoidIO)(replicate(n, mv))

time(replicateIO(3, randomFib))()
