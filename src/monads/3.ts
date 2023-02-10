// h = flatten * map(g) * f
//   = flatMap(g) * f
// chain = flatten * map

import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as A from 'fp-ts/ReadonlyArray'
import { getFollowers, user, User } from './user'

const followersOfFollowers: ReadonlyArray<User> = pipe(
  user,
  getFollowers,
  A.chain(getFollowers),
  A.chain(getFollowers), // chain multiple functions.
)

console.log(
  followersOfFollowers
)

const inverse = (n: number): O.Option<number> =>
  n === 0 ? O.none : O.some(1 / n)

const inverseHead: O.Option<number> =
  pipe(
    [1, 2, 3],
    A.head,
    O.chain(inverse)
  )

console.log(inverseHead)
