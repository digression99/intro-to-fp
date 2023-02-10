// F = Option with ap

import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'

const ap =
  <A>(fa: O.Option<A>) =>
    <B>(fab: O.Option<(a: A) => B>): O.Option<B> =>
      pipe(
        fab,
        O.match(
          () => O.none,
          (f) =>
            pipe(
              fa,
              O.match(
                () => O.none,
                (a) => O.some(f(a))
              )
            )
        )
      )

const double = (n: number): number => n * 2

pipe(
  O.some(double),
  ap(O.some(1)),
  console.log
)

pipe(
  O.some(double),
  ap(O.none),
  console.log
)

pipe(
  O.none,
  ap(O.some(1)),
  console.log
)

pipe(
  O.none,
  ap(O.none),
  console.log
)
