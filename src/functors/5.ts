// F = Task

import { flow } from 'fp-ts/function'
import { Task } from 'fp-ts/Task'

const map =
  <B, C>(g: (b: B) => C) =>
    (fb: Task<B>): Task<C> => () => {
      const promise = fb()
      return promise.then(g)
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

// Q. What about task option?
const getUser =
  (id: number): Task<User> =>
    () => Promise.resolve(database[id])

const getName =
  (user: User): string => user.name

const getUserName = flow(getUser, map(getName))

getUserName(1)().then(console.log)

