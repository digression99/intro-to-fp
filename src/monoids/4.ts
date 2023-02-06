// concatAll
// - concatenation with Monoid is easier than
// Semigroup, since there's no need to provide
// initial value every time we use it.

import { concatAll } from 'fp-ts/Monoid'
import * as S from 'fp-ts/string'
import * as N from 'fp-ts/number'
import * as B from 'fp-ts/boolean'

console.log(
  concatAll(N.MonoidSum)([1, 2, 3, 4])
)

console.log(
  concatAll(N.MonoidProduct)([1, 2, 3, 4])
)

console.log(
  concatAll(S.Monoid)(['a', 'b', 'c'])
)

console.log(
  concatAll(B.MonoidAll)([true, false, true])
)

console.log(
  concatAll(B.MonoidAny)([true, false, true])
)
