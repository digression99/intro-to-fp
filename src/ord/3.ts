import { pipe } from 'fp-ts/function'
import * as N from 'fp-ts/number'
import { contramap, fromCompare, Ord } from 'fp-ts/Ord'

type User = {
  readonly name: string
  readonly age: number
}

const byAge: Ord<User> =
  fromCompare((first, second) =>
    N.Ord.compare(first.age, second.age)
  )

// or, use contramap
const byAge2: Ord<User> =
  pipe(
    N.Ord,
    contramap((_: User) => _.age)
  )

const min =
  <A>(O: Ord<A>) => (second: A) => (first: A) =>
  O.compare(first, second) === 1 ? second : first

const getYounger = min(byAge)

pipe(
  { name: 'Guido', age: 50 },
  getYounger({ name: 'Giulio', age: 47 }),
  console.log
)
