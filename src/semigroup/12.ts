// This represents there should be at least 
// one element.
// type ReadonlyNonEmptyArray<A> = ReadonlyArray<A> & {
//   readonly 0: A
// }
//
// const getSemigroup =
//   <A>(): Semigroup<ReadonlyNonEmptyArray<A>> => ({
//     concat: (first, second) =>
//       [first[0], ...first.slice(1), ...second]
//   })
//
// const of = <A>(a: A): ReadonlyNonEmptyArray<A> => [a]

import {
  getSemigroup,
  of,
  ReadonlyNonEmptyArray
} from 'fp-ts/ReadonlyNonEmptyArray'
import { Semigroup } from 'fp-ts/Semigroup'

type User = {
  readonly id: number
  readonly name: string
}

const S: Semigroup<ReadonlyNonEmptyArray<User>> =
  getSemigroup<User>()

declare const user1: User
declare const user2: User
declare const user3: User

const merge = S.concat(
  S.concat(
    of(user1), of(user2)
  ),
  of(user3)
)

const merge2: ReadonlyNonEmptyArray<User> =
  [user1, user2, user3]
