// F = IO

import { flow } from 'fp-ts/function'
import { IO } from 'fp-ts/IO'

const map =
  <B, C>(g: (b: B) => C) =>
    (fb: IO<B>): IO<C> => () => {
      const b = fb()
      return g(b)
    }

interface User {
  readonly id: number
  readonly name: string
}

const database: Record<number, User> = {
  1: { id: 1, name: 'Ruth R. Gonzalez' },
  2: { id: 2, name: 'Terry R. Emerson' },
  3: { id: 3, name: 'Marsha J. Joslyn' },
}

// side effect
const getUser = (id: number): IO<User> => () => database[id]
const getName = (user: User): string => user.name

const getUserName = flow(getUser, map(getName))

console.log(
  getUserName(1)()
)
