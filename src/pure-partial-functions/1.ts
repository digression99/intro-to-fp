import { Monoid } from 'fp-ts/Monoid'

// the ultimate goal is to
// meet the referential transparency.
// local mutation is not banned.
const concatAll =
  <A>(M: Monoid<A>) =>
    (as: ReadonlyArray<A>): A => {
      let out: A = M.empty
      for (const a of as) {
        out = M.concat(out, a)
      }
      return out
    }
