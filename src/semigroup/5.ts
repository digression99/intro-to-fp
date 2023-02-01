// semigroup
// - given Magma, the `concat` operation
// is associative.
// - every semigroup is a magma.
// - computations can be seprated into sub computations.
// Semigroup runs parallelizxable operations
// using this fact.
// ---- 
// interface Semigroup<A> extends Magma<A> { }
// S.concat(S.concat(x, y), z) == S.concat(x, S.concat(y, z))

import * as Se from 'fp-ts/Semigroup'

const Semigroup: Se.Semigroup<ReadonlyArray<string>> = {
  concat: (first, second) => first.concat(second)
}

const SemigroupSum: Se.Semigroup<number> = {
  concat: (first, second) => first + second
}

const SemigroupProduct: Se.Semigroup<number> = {
  concat: (first, second) => first * second
}

const SemigroupString: Se.Semigroup<string> = {
  concat: (first, second) => first + second
}

const SemigroupAll: Se.Semigroup<boolean> = {
  concat: (first, second) => first && second
}

const SemigroupAny: Se.Semigroup<boolean> = {
  concat: (first, second) => first || second
}
