
// import for the game
import { pipe } from 'fp-ts/function'
import * as N from 'fp-ts/number'
import * as O from 'fp-ts/Option'
import { between } from 'fp-ts/Ord'
import { randomInt } from 'fp-ts/Random'
import * as T from 'fp-ts/Task'
import { putStrLn, getLine } from './console'

const secret: T.Task<number> = T.fromIO(randomInt(1, 100))

// combinator. print a message before an action
const withMessage =
  <A>(message: string, next: T.Task<A>): T.Task<A> =>
    pipe(
      putStrLn(message),
      T.chain(() => next)
    )

// check if the number is in between 1 and 100
const isValidGuess = between(N.Ord)(1, 100)

// if the guess is wrong, return O.none
const parseGuess =
  (s: string): O.Option<number> => {
    const n = parseInt(s, 10)
    return isNaN(n) || !isValidGuess(n) ? O.none : O.some(n)
  }

const question: T.Task<string> =
  withMessage('Enter the number between 1 and 100:', getLine)

const answer: T.Task<number> =
  pipe(
    question,
    T.chain(s =>
      pipe(
        s,
        parseGuess,
        O.match(
          () => withMessage('Enter the number between 1 and 100', answer),
          a => T.of(a)
        )
      )
    )
  )

const check = <A>(
  secret: number,
  guess: number,
  ok: T.Task<A>,
  ko: T.Task<A>
): T.Task<A> => {
  if (guess > secret) {
    return withMessage('Less than', ko)
  } else if (guess < secret) {
    return withMessage('Greater than', ko)
  } else {
    return ok
  }
}

const end:
  T.Task<void> = putStrLn('You found it!')

const loop =
  (secret: number): T.Task<void> =>
    pipe(
      answer,
      T.chain(guess => check(secret, guess, end, loop(secret)))
    )

const program: T.Task<void> =
  pipe(secret, T.chain(loop))

program()
