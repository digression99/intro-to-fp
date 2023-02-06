import { Eq } from 'fp-ts/Eq'
import { pipe } from 'fp-ts/function'
import * as N from "fp-ts/number"

const elem = <A>(E: Eq<A>) => (a: A) =>
  (as: ReadonlyArray<A>): boolean =>
    as.some(e => E.equals(a, e))

pipe(
  [1, 2, 3],
  elem(N.Eq)(2),
  console.log
) // true

pipe(
  [1, 2, 3],
  elem(N.Eq)(4),
  console.log
) // false
