// not every semigroup is a monoid.
import { pipe } from 'fp-ts/function'
import { intercalate } from 'fp-ts/Semigroup'
import * as S from 'fp-ts/string'

// This semigroup cannot be monoid.
// There no unit that make "concat(a, empty) = a"
const SemigroupIntercalate = pipe(
  S.Semigroup,
  intercalate('|')
)

console.log(
  S.Semigroup.concat('a', 'b')
)

console.log(
  SemigroupIntercalate.concat('a', 'b')
)

console.log(
  SemigroupIntercalate.concat('a', '')
)
