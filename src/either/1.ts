
interface Left<E> {
  readonly _tag: 'Left'
  readonly left: E
}

interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}

type Either<E, A> = Left<E> | Right<A>

// constructors
const left =
  <E, A>(left: E): Either<E, A> =>
    ({ _tag: 'Left', left })

const right =
  <A, E>(right: A): Either<E, A> =>
  ({
    _tag: 'Right',
    right
  })

const match = <E, R, A>(
  onLeft: (left: E) => R,
  onRight: (right: A) => R
) =>
  (fa: Either<E, A>): R => {
    switch (fa._tag) {
      case 'Left':
        return onLeft(fa.left)
      case 'Right':
        return onRight(fa.right)
    }
  }

import { pipe } from 'fp-ts/function'
// nodejs readFile declaration
// using Either monad
declare function readFile(
  path: string,
  callback:
    (result: Either<Error, string>) => void
  // callback: (err?: Error, data?: string) => void
): void

readFile('./myFile', (e) =>
  pipe(
    e,
    match(
      err => `Error: ${err.message}`,
      data => `Data: ${data.trim()}`
    )
  )
)
