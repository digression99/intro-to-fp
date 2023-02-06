
type Endomorpyhism<A> = (a: A) => A

import { Endomorphism, flow, identity } from 'fp-ts/function'
import { Monoid } from 'fp-ts/Monoid'

// const identity = <A>(a: A) => a
const getEndomorphismMonoid =
  <A>(): Monoid<Endomorphism<A>> => ({
    concat: flow,
    empty: identity
  })

