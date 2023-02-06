import { flow, increment, pipe } from 'fp-ts/function'
import { map } from 'fp-ts/ReadonlyArray'

const double = (n: number) => n * 2

console.log(
  pipe(
    [1, 2, 3],
    map(double),
    map(increment)
  )
)

console.log(
  pipe(
    [1, 2, 3],
    // single iteration.
    map(
      flow(
        double,
        increment
      )
    )
  )
)
