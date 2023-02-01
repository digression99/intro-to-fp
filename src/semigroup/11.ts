import { pipe } from 'fp-ts/function'
import { Semigroup } from 'fp-ts/Semigroup'
import * as S from 'fp-ts/string'

export const intercalate = <A>(middle: A) =>
  (S: Semigroup<A>): Semigroup<A> => ({
    concat: (first, second) =>
      S.concat(S.concat(first, middle), second)
  })

const SemigroupIntercalate = pipe(
  S.Semigroup,
  intercalate('|')
)

console.log(SemigroupIntercalate)

pipe(
  SemigroupIntercalate.concat(
    'a',
    SemigroupIntercalate.concat('b', 'c')
  ),
  console.log
)
