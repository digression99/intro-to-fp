// Semigroup min/max
import { Semigroup } from 'fp-ts/Semigroup'

const SemigroupMin: Semigroup<number> = {
  concat: (first, second) => Math.min(first, second)
}

const SemigroupMax: Semigroup<number> = {
  concat: (first, second) => Math.max(first, second)
}

// Ord min/max
import { pipe } from 'fp-ts/function'
import * as N from 'fp-ts/number'
import { Ord, contramap } from 'fp-ts/Ord'
// import { Semigroup } from 'fp-ts/Semigroup'

// returns semigroup that uses
// concat to compare.
const min = <A>(O: Ord<A>): Semigroup<A> => ({
  concat: (first, second) =>
    O.compare(first, second) === 1 ? second : first
})

const max = <A>(O: Ord<A>): Semigroup<A> => ({
  concat: (first, second) =>
    O.compare(first, second) === 1 ? first : second
})

type User = {
  readonly name: string
  readonly age: number
}

const byAge: Ord<User> = pipe(
  N.Ord,
  contramap((_: User) => _.age)
)

console.log(
  min(byAge).concat({ name: 'Guido', age: 50 },
    { name: 'Giulio', age: 47 }
  )
)

console.log(
  max(byAge).concat({ name: 'Guido', age: 50 },
    { name: 'Giulio', age: 47 }
  )
)
