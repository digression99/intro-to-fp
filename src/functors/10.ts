// functors compose

import { flow } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as T from 'fp-ts/Task'
import { User, database } from './database'

type TaskOption<A> = T.Task<O.Option<A>>

const map: <A, B>(f: (a: A) => B) =>
  (fa: TaskOption<A>) => TaskOption<B> = flow(O.map, T.map)

const getUser = (id: number): TaskOption<User> =>
  () => Promise.resolve(
    O.fromNullable(database[id])
  )

const getName =
  (user: User): string => user.name

const getUserName =
  flow(getUser, map(getName))

getUserName(1)().then(console.log)
getUserName(4)().then(console.log)
