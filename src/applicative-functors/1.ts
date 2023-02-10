// if g accepts two or more arguments,
// we need ap.
// Currying

interface User {
  readonly id: number
  readonly name: string
  readonly followers: ReadonlyArray<User>
}

const addFollower = (follower: User) =>
  (user: User) => ({
    ...user,
    followers: [...user.followers, follower]
  })

const user: User = {
  id: 1,
  name: 'Ruth R. Gonzalez',
  followers: []
}

const follower: User = {
  id: 3,
  name: 'Marsha J. Joslyn',
  followers: []
}

console.log(addFollower(follower)(user))
