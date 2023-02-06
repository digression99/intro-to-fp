// for the interface Customer,
// create a semigroup that
// could merge two customers into one
// using "concat" to remove
// duplicate customer records.

import * as B from 'fp-ts/boolean'
import { pipe } from 'fp-ts/function'
import * as N from 'fp-ts/number'
import { contramap } from 'fp-ts/Ord'
import * as RA from 'fp-ts/ReadonlyArray'
import {
  max,
  min,
  Semigroup,
  struct
} from 'fp-ts/Semigroup'
import * as S from 'fp-ts/string'

interface Customer {
  readonly name: string
  readonly favouriteThings: ReadonlyArray<string>
  readonly registeredAt: number
  readonly lastUpdatedAt: number
  readonly hasMadePurchase: boolean
}

const SemigroupCustomer: Semigroup<Customer> =
  struct({
    name:
      max(pipe(N.Ord, contramap(S.size))),
    favouriteThings:
      RA.getSemigroup<string>(),
    registeredAt: min(N.Ord),
    lastUpdatedAt: max(N.Ord),
    hasMadePurchase: B.SemigroupAny
  })

const customers: ReadonlyArray<Customer> = [
  {
    name: 'Giulio',
    favouriteThings: ['math', 'climbing'],
    registeredAt: new Date(2018, 1, 20).getTime(),
    lastUpdatedAt: new Date(2018, 2, 18).getTime(),
    hasMadePurchase: false
  },

  {
    name: 'Giulio Canti',
    favouriteThings: ['functional programming'],
    registeredAt: new Date(2018, 1, 22).getTime(),
    lastUpdatedAt: new Date(2018, 2, 9).getTime(),
    hasMadePurchase: true
  },
]

pipe(
  SemigroupCustomer.concat(customers[0], customers[1]),
  console.log
)

// TODO - run concat for multiple RAs.

