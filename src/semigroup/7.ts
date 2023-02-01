import * as B from 'fp-ts/boolean'
import { Semigroup, concatAll } from 'fp-ts/Semigroup'
import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/struct'

const every =
  <A>(predicate: (a: A) => boolean) =>
    (as: ReadonlyArray<A>): boolean =>
      concatAll(B.SemigroupAll)(true)(as.map(predicate))

const some =
  <A>(predicate: (a: A) => boolean) =>
    (as: ReadonlyArray<A>): boolean =>
      concatAll(B.SemigroupAny)(false)(as.map(predicate))

// merge list of objects.
const assign: (as: ReadonlyArray<object>) => object =
  concatAll(
    S.getAssignSemigroup<object>()
  )({})

const first = <A>(): Semigroup<A> => ({
  concat: (first, _second) => first
})

const second = <A>(): Semigroup<A> => ({
  concat: (_first, second) => second
})

pipe(
  [11, 12, 13, 14, 15],
  every((a) => a > 10),
  console.log
)

pipe(
  [11, 12, 13, 14, 15],
  some((a) => a < 10),
  console.log
)

pipe(
  [{ a: 1, b: 1 }, { a: 2, c: 3 }],
  assign,
  console.log
)
