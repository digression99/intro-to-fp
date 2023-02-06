import { pipe } from 'fp-ts/function'
import { Eq, struct } from 'fp-ts/Eq'
import * as N from 'fp-ts/number'

type Point = {
  readonly x: number
  readonly y: number
}

const EqPoint: Eq<Point> = struct({
  x: N.Eq,
  y: N.Eq
})

// const elem = <A>(E: Eq<A>) => (a: )

pipe(
  EqPoint.equals({ x: 0, y: 0 }, { x: 0, y: 0 }),
  console.log
)

