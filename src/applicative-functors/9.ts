// TaskOption

import { flow } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as T from 'fp-ts/Task'

type TaskOption<A> = T.Task<O.Option<A>>

const of: <A>(a: A) =>
  TaskOption<A> = flow(O.of, T.of)

const ap = <A>(fa: TaskOption<A>):
  (<B>(fab: TaskOption<(a: A) => B>) => TaskOption<B>) =>
  flow(
    T.map(gab => (ga: O.Option<A>) => O.ap(ga)(gab)),
    T.ap(fa)
  )

