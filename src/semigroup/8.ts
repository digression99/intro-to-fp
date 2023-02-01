import { pipe } from 'fp-ts/function'
import { Semigroup } from 'fp-ts/Semigroup'
import * as S from 'fp-ts/string'
import * as N from 'fp-ts/number'
import * as B from 'fp-ts/boolean'

const reverse =
  <A>(S: Semigroup<A>): Semigroup<A> => ({
    concat: (first, second) => S.concat(second, first)
  })

pipe(
  S.Semigroup.concat('a', 'b'),
  console.log
)

pipe(
  reverse(S.Semigroup).concat('a', 'b'),
  console.log
)

pipe(
  reverse(N.SemigroupSum).concat(1, 2),
  console.log
)

pipe(
  reverse(B.SemigroupAny).concat(false, true),
  console.log
)
