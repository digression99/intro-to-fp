import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as A from 'fp-ts/ReadonlyArray'

const inverse =
  (n: number): O.Option<number> =>
    n === 0 ? O.none : O.some(1 / n)

const inverseHead =
  pipe(
    [1, 2, 3],
    A.head,
    O.map(inverse),
    O.flatten
  )

console.log(inverseHead)
