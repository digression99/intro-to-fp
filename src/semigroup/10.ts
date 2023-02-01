import * as N from 'fp-ts/number'
import { Semigroup, tuple } from 'fp-ts/Semigroup'

type Vector = readonly [number, number]

const SemigroupVector: Semigroup<Vector> =
  tuple(N.SemigroupSum, N.SemigroupSum)

const v1: Vector = [1, 1]
const v2: Vector = [1, 2]

console.log(SemigroupVector.concat(v1, v2))
