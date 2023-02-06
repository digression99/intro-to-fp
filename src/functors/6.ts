import { flow } from 'fp-ts/function'
import { Reader } from 'fp-ts/Reader'

const map = <B, C>(g: (b: B) => C) =>
  <R>(fb: Reader<R, B>): Reader<R, C> =>
    (r) => {
      const b = fb(r)
      return g(b)
    }

interface User {
  readonly id: number
  readonly name: string
}

interface Env {
  readonly database: Record<string, User>
}

const getUser = (id: number): Reader<Env, User> =>
  (env) => env.database[id]

const getName = (user: User): string => user.name

const getUserName = flow(getUser, map(getName))

const database: Record<number, User> = {
  1: { id: 1, name: 'Ruth R. Gonzalez' },
  2: { id: 2, name: 'Terry R. Emerson' },
  3: { id: 3, name: 'Marsha J. Joslyn' },
}

console.log(
  getUserName(1)({
    database
  })
)
