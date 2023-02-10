// dice roll

import { pipe } from 'fp-ts/function'
import * as IO from 'fp-ts/IO'
import { Monoid } from 'fp-ts/Monoid'
import * as R from 'fp-ts/Random'

export interface Die extends IO.IO<number> { }

export const die =
  (faces: number): Die => R.randomInt(1, faces)

export const modifier =
  (n: number) => (die: Die): Die =>
    pipe(
      die,
      IO.map(m => m + n)
    )

// Q. should we really need to implement this?
const liftA2 =
  <A, B, C>(f: (a: A) => (b: B) => C) =>
    (fa: IO.IO<A>) => (fb: IO.IO<B>): IO.IO<C> =>
      pipe(fa, IO.map(f), IO.ap(fb))

const add: (second: Die) =>
  (first: Die) => Die =
  liftA2((a: number) => (b: number) => a + b)

const multiply = (n: number) => (die: Die): Die =>
  pipe(die, IO.map(m => m * n))

const monoidDie: Monoid<Die> = {
  concat: (first, second) => pipe(first, add(second)),
  empty: () => 0
}

const d6 = die(6)
const d8 = die(8)

const _2d6_1d8_2 = pipe(
  d6,
  multiply(2),
  add(d8),
  modifier(2)
)

console.log(
  _2d6_1d8_2()
)
