import { pipe } from 'fp-ts/function'
import { Eq, tuple } from 'fp-ts/Eq'
import * as N from 'fp-ts/number'
import * as RA from 'fp-ts/ReadonlyArray'

type Point = readonly [number, number]

const EqPoint: Eq<Point> = tuple(N.Eq, N.Eq)

pipe(
  EqPoint.equals([1, 2], [1, 2]),
  console.log
) // true

pipe(
  EqPoint.equals([1, 2], [1, -2]),
  console.log
) // false

const EqPoints: Eq<ReadonlyArray<Point>> =
  RA.getEq(EqPoint)


const pa1: ReadonlyArray<Point> = [[1, 2], [3, 4]]
const pa2: ReadonlyArray<Point> = [[1, 2], [3, 4]]

pipe(
  EqPoints.equals(pa1, pa2),
  console.log
) // true

const pa3: ReadonlyArray<Point> = [[1, 2], [3, 4]]
const pa4: ReadonlyArray<Point> = [[1, 2], [3, -4]]

pipe(
  EqPoints.equals(pa3, pa4),
  console.log
) // false
