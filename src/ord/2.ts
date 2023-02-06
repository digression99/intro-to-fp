import { flow, pipe } from 'fp-ts/function'
import * as N from 'fp-ts/number'
import { Ord, fromCompare } from 'fp-ts/Ord'

// slice() copies the original array.
//
const sort = <A>(O: Ord<A>) =>
  (as: ReadonlyArray<A>): ReadonlyArray<A> =>
    as.slice().sort(O.compare)

pipe(
  [3, 1, 2],
  sort(N.Ord),
  console.log
)

const min =
  <A>(O: Ord<A>) => (second: A) =>
    (first: A): A =>
      O.compare(first, second) === 1 ? second : first

pipe(
  2,
  min(N.Ord)(1),
  console.log
)

const reverse =
  <A>(O: Ord<A>): Ord<A> =>
    fromCompare((first, second) =>
      O.compare(second, first))

const max = flow(reverse, min)

pipe(
  2,
  max(N.Ord)(1),
  console.log
)
