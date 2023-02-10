// use liftA2

import { flow, pipe } from 'fp-ts/function'
import * as T from 'fp-ts/Task'


// liftA2 uses
// T.map(), which waits the promise to be resolved.
const liftA2 =
  <B, C, D>(g: (b: B) => (c: C) => D) =>
    (fb: T.Task<B>) => (fc: T.Task<C>): T.Task<D> =>
      pipe(fb, T.map(g), T.ap(fc))

interface User {
  readonly id: number
  readonly name: string
  readonly followers: ReadonlyArray<User>
}

const addFollower =
  (follower: User) => (user: User) => ({
    ...user,
    followers: [...user.followers, follower]
  })

const addFollowerAsync = liftA2(addFollower)

declare const fetchUser: (id: number) => T.Task<User>

const program =
  flow(fetchUser, liftA2(addFollower))

const userId = 1
const followerId = 3
const result = program(followerId)(fetchUser(userId))

