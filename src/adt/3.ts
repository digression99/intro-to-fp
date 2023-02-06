// Option
// with try/catch,
// the type system is ignorant about
// the possibility of failiure.

import { pipe } from 'fp-ts/function'

// declare const numbers: ReadonlyArray<number>
const numbers = [1, 2, 3, 4, 5]

function module1() {
  interface None {
    readonly _tag: 'None'
  }

  interface Some<A> {
    readonly _tag: 'Some'
    readonly value: A
  }

  type Option<A> = None | Some<A>

  const none: Option<never> = { _tag: 'None' }

  const some =
    <A>(value: A): Option<A> => ({
      _tag: 'Some',
      value
    })

  const match = <R, A>(
    onNone: () => R,
    onSome: (a: A) => R
  ) => (fa: Option<A>): R => {
    switch (fa._tag) {
      case 'None':
        return onNone()
      case 'Some':
        return onSome(fa.value)
    }
  }

  // example of list

  const head =
    <A>(as: ReadonlyArray<A>): Option<A> =>
      as.length === 0 ? none : some(as[0])

  const result = pipe(
    head(numbers),
    match(
      // handle error.
      () => 'Empty array',
      // handle business logic.
      (n) => String(n)
    )
  )

  console.log(result)
}

module1()
