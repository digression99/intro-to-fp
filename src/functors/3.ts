// F = Option

import { flow } from 'fp-ts/function'
import { none, Option, match, some } from 'fp-ts/Option'

const map = <B, C>(g: (b: B) => C): ((fb: Option<B>) => Option<C>) =>
  match(
    () => none,
    (b) => {
      const c = g(b)
      return some(c)
    }
  )

import * as RA from 'fp-ts/ReadonlyArray'

const head: (input: ReadonlyArray<number>) => Option<number> = RA.head
const double = (n: number): number => n * 2

const getDoubleHead = flow(head, map(double))

console.log(
  getDoubleHead([1, 2, 3])
)

console.log(
  getDoubleHead([])
)
