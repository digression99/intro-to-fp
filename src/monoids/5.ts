import { Monoid, struct, tuple } from 'fp-ts/Monoid'
import * as N from 'fp-ts/number'

type Point = {
  readonly x: number
  readonly y: number
}

const PointMonoid: Monoid<Point> = struct({
  x: N.MonoidSum,
  y: N.MonoidSum
})


// can be used to build the matrix system.
type PointTuple = readonly [number, number]

const PointTupleMonoid: Monoid<PointTuple> = tuple(
  N.MonoidSum,
  N.MonoidSum
)

console.log(
  PointTupleMonoid.concat([1, 2], [3, 4])
)



