export interface User {
  readonly id: number
  readonly name: string
  readonly followers: ReadonlyArray<User>
}

export const getFollowers =
  (user: User): ReadonlyArray<User> =>
    user.followers

const user3: User = {
  id: 3,
  name: 'Song',
  followers: []
}

const user4: User = {
  id: 4,
  name: 'Jang',
  followers: [user3]
}

const user1: User = {
  id: 1,
  name: 'Jin',
  followers: [user3, user4]
}

const user2: User = {
  id: 2,
  name: 'Chris',
  followers: [user3, user4]
}

// declare const user: User
export const user: User = {
  id: 0,
  name: 'kim',
  followers: [user1, user2]
}

