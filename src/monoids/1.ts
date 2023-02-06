// Magma - concat should be closed on A
// concat(first: A, second: A) => A

// semigroup with the following requirements
// is a monoid.
// concat(a, empty) = a
// concat(empty, a) = a
// empty is now unit.
// - or, neutral element, identity element.

// import { Semigroup } from 'fp-ts/Semigroup'
//
// interface Monoid<A> extends Semigroup<A> {
//   readonly empty: A
// }

import { Monoid } from 'fp-ts/Monoid'

// monoid always contains the valid empty.
const MonoidSum: Monoid<number> = {
  concat: (first, second) => first + second,
  empty: 0
}

const MonoidProduct: Monoid<number> = {
  concat: (first, second) => first * second,
  empty: 1
}

const MonoidString: Monoid<string> = {
  concat: (first, second) => first + second,
  empty: ''
}

const MonoidAll: Monoid<boolean> = {
  concat: (first, second) => first && second,
  empty: true
}

const MonoidAny: Monoid<boolean> = {
  concat: (first, second) => first || second,
  empty: false
}

import { Semigroup } from 'fp-ts/Semigroup'

const SemigroupTest: Semigroup<ReadonlyArray<string>> = {
  concat: (first, second) => first.concat(second)
}

const MonoidTest: Monoid<ReadonlyArray<string>> = {
  concat: (first, second) => [...first, ...second],
  empty: []
}


