// lift - a transformation
// which beginning with a function
// `g: (b: B) => (c: C) => D`
// and returns
// `liftA2(g): (fb: F<B>) => (fc: F<C>) => F<D>`

import * as T from 'fp-ts/Task'

interface User {
  readonly id: number
  readonly name: string
  readonly followers: ReadonlyArray<User>
}

declare const fetchUser: (id: number) => T.Task<User>

declare const addFollowerAsync: (
  follower: T.Task<User>
) => (user: T.Task<User>) => T.Task<User>

const userId = 1
const followerId = 3

const result =
  addFollowerAsync(
    fetchUser(followerId)
  )(fetchUser(userId))

// ap
// - ap unpacks the type `F<(c: C) => D>` into
//   (fc: F<C>) => F<D>
declare const apply: <A>(a: A) => <B>(f: (a: A) => B) => B
declare const ap: <A>(a: Task<A>) =>
  <B>(f: Task<(a: A) => B>) =>
    Task<B>
