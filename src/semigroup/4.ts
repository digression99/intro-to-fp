// magma
// - A set or type (A)
// - a `concat` operation
// - closure property - `concat` is a closed operation,
// which means that whichever elements `A` we
// apply the operation on the result
// will still be an element of A.

// interface Magma<A> {
//   readonly concat: (first: A, second: A) => A
// }

import { Magma } from 'fp-ts/Magma'
import { pipe } from 'fp-ts/function'

const MagmaSub: Magma<number> = {
  concat: (first, second) => first - second
}

const getPipeableConcat = <A>(M: Magma<A>) =>
  (second: A) =>
    (first: A): A => M.concat(first, second)
const concat = getPipeableConcat(MagmaSub)

pipe(
  10,
  concat(2),
  concat(3),
  concat(1),
  concat(2),
  console.log
)

pipe(
  MagmaSub.concat(
    MagmaSub.concat(1, 2),
    3
  ),
  console.log
)

pipe(
  MagmaSub.concat(
    1,
    MagmaSub.concat(2, 3)
  ),
  console.log
)
