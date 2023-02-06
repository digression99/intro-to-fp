// F = ReadonlyArray
import { flow, pipe } from 'fp-ts/function'

const map =
  <B, C>(g: (b: B) => C) => (
    fb: ReadonlyArray<B>
  ): ReadonlyArray<C> => fb.map(g)

interface User {
  readonly id: number
  readonly name: string
  readonly followers: ReadonlyArray<User>
}

const getFollowers =
  (user: User): ReadonlyArray<User> => user.followers

const getName = (user: User): string => user.name

const getFollowersNames = flow(
  getFollowers,
  map(getName)
)

const getFllowersNames2 =
  (user: User) =>
    pipe(user, getFollowers, map(getName))

const user: User = {
  id: 1,
  name: 'Ruth R. Gonzalez',
  followers: [
    {
      id: 2,
      name: 'Terry R. Emerson',
      followers: []
    },
    {
      id: 3,
      name: 'Marsha J. Joslyn',
      followers: []
    },
  ]
}

console.log(
  getFollowersNames(user)
)
