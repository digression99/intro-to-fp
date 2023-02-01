import { increment, identity, pipe, flow } from 'fp-ts/function'
import { map, getMonoid, foldMap, reduceRight, makeBy } from 'fp-ts/Array'
// import * as Identity from 'fp-ts/Identity'

function double(n: number) {
  return n * 2
}

const monoid1 = {
  concat: (a: number, b: number) => a + b,
  empty: 0
}

const arr1 = makeBy(5, identity)

const monoid2 = getMonoid<number>()

const program1 = flow(
  map(double),
  foldMap(monoid1)(increment),
  // reduceRight(0, (a: number, c: number) => a + c)
)

console.log(program1(arr1))

