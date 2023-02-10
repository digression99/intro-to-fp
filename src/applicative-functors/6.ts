import { IO } from 'fp-ts/IO'
import { pipe } from 'fp-ts/function'
import * as T from 'fp-ts/Task'
import { Reader } from 'fp-ts/Reader'

// F - IO
const ap_IO =
  <A>(fa: IO<A>) =>
    <B>(fab: IO<(a: A) => B>): IO<B> => () => {
      const f = fab()
      const a = fa()
      return f(a)
    }

// F - Task
const ap_Task =
  <A>(fa: T.Task<A>) =>
    <B>(fab: T.Task<(a: A) => B>): T.Task<B> => () =>
      Promise.all([fab(), fa()]).then(([f, a]) => f(a))

// F - Reader
const ap_Reader =
  <R, A>(fa: Reader<R, A>) => <B>(
    fab: Reader<R, (a: A) => B>
  ): Reader<R, B> => (r) => {
    const f = fab(r)
    const a = fa(r)
    return f(a)
  }


