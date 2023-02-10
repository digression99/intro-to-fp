// of

import { IO } from 'fp-ts/IO'
import { Task } from 'fp-ts/Task'
import { Reader } from 'fp-ts/Reader'

const of_ReadonlyArray = <A>(a: A): ReadonlyArray<A> => [a]
const of_IO = <A>(a: A): IO<A> => () => a
const of_Task = <A>(a: A): Task<A> => () => Promise.resolve(a)
const of_Reader = <R, A>(a: A): Reader<R, A> => () => a




