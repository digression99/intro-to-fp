
// interface Eq<A> {
//   readonly equals: (first: A, second: A) => boolean
// }

import { Eq } from 'fp-ts/Eq'
import { pipe } from 'fp-ts/function'

const EqNumber: Eq<number> = {
  equals: (first, second) => first === second
}

// doesn't make sense.
const reverse = <A>(E: Eq<A>): Eq<A> => ({
  equals: (first, second) => E.equals(second, first)
})

export const not = <A>(E: Eq<A>): Eq<A> => ({
  equals: (first, second) => !E.equals(first, second)
})

pipe(
  not(EqNumber).equals(1, 1),
  console.log
)

pipe(
  EqNumber.equals(1, 2), console.log
)
