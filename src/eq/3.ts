import { pipe } from 'fp-ts/function'
import { Eq } from 'fp-ts/Eq'


// if you define a type,
// you need to provide all corresponding
// functional data structures.
type Point = {
  readonly x: number
  readonly y: number
}

const elem = <A>(E: Eq<A>) => (a: A) =>
  (as: ReadonlyArray<A>): boolean =>
    as.some(e => E.equals(a, e))
//
// const elem = <A>(E: Eq<A>) => (a: A) =>
//   (as: ReadonlyArray<A>): boolean =>
//     as.some(e => E.equals(a, e))

const EqPoint: Eq<Point> = {
  equals:
    (first, second) =>
      first.x === second.x &&
      first.y === second.y
}

pipe(
  EqPoint.equals({
    x: 1, y: 2
  }, {
    x: 1, y: 2
  }),
  console.log
) // true

pipe(
  EqPoint.equals({
    x: 1, y: 2
  }, {
    x: 1, y: -2
  }),
  console.log
) // false

const points: ReadonlyArray<Point> = [
  { x: 0, y: 0 },
  { x: 1, y: 1 },
  { x: 2, y: 2 },
]

const search: Point = { x: 1, y: 1 }

pipe(
  points.includes(search),
  console.log
) // false

pipe(
  points,
  elem(EqPoint)(search),
  console.log
) // true


