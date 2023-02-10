import { increment, pipe } from 'fp-ts/function'

const ap =
  <A>(fa: ReadonlyArray<A>) =>
    <B>(fab: ReadonlyArray<(a: A) => B>): ReadonlyArray<B> => {
      const out: Array<B> = []

      for (const f of fab) {
        for (const a of fa) {
          out.push(f(a))
        }
      }

      return out
    }

const double = (n: number): number => n * 2

pipe(
  [double, increment],
  ap([1, 2, 3]),
  console.log
)
