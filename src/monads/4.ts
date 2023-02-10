// chain implementation
import { Option, match, none } from 'fp-ts/Option'
import { IO } from 'fp-ts/IO'
import { Task } from 'fp-ts/Task'
import { Reader } from 'fp-ts/Reader'

const chain_ReadonlyArray =
  <B, C>(g: (b: B) => ReadonlyArray<C>) =>
    (mb: ReadonlyArray<B>): ReadonlyArray<C> => {
      const out: C[] = []
      for (const b of mb) {
        out.push(...g(b))
      }
      return out
    }

const chain_Option =
  <B, C>(g: (b: B) => Option<C>): ((mb: Option<B>) => Option<C>) =>
    match(() => none, g)

const chain_Task =
  <B, C>(g: (b: B) => Task<C>) =>
    (mb: Task<B>): Task<C> =>
      () =>
        mb().then(b => g(b)())

const chain_Reader =
  <B, R, C>(g: (b: B) => Reader<R, C>) =>
    (mb: Reader<R, B>): Reader<R, C> =>
      (r) => g(mb(r))(r)

