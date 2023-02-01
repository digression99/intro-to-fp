import { pipe } from 'fp-ts/function'
import * as S from 'fp-ts/Semigroup'
import * as N from 'fp-ts/number'
import * as NEA from 'fp-ts/NonEmptyArray'

const concatAllWithoutInitialValue =
  <A>(SemigroupArg: S.Semigroup<A>) =>
    (as: NEA.NonEmptyArray<A>) =>
      S.concatAll(SemigroupArg)(NEA.tail(as))(NEA.head(as))

const sum = S.concatAll(N.SemigroupSum)(0)
const product = S.concatAll(N.SemigroupProduct)(1)

pipe(
  [1, 2, 3, 4],
  sum,
  console.log
)

pipe(
  [1, 2, 3, 4],
  product,
  console.log
)


