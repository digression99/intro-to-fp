import * as N from 'fp-ts/number'
import { struct, Semigroup } from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'
import { foldMap } from 'fp-ts/Array'

type Vector = {
  readonly x: number
  readonly y: number
}

// const SemigroupVector: Semigroup<Vector> = {
//   concat: (first, second) => ({
//     x: N.SemigroupSum.concat(first.x, second.x),
//     y: N.SemigroupSum.concat(first.y, second.y)
//   })
// }
// or
const SemigroupVector: Semigroup<Vector> = struct({
  x: N.SemigroupSum,
  y: N.SemigroupSum
})

const v1 = { x: 1, y: 2 }
const v2 = { x: 3, y: 4 }

pipe(
  SemigroupVector.concat(v1, v2),
  console.log
)




