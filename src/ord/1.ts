// import { Eq } from 'fp-ts/lib/Eq'
//
// type Ordering = -1 | 0 | 1
//
// interface Ord<A> extends Eq<A> {
//   readonly compare: (x: A, y: A) => Ordering
// }
// x < y if and only if compare(x, y) = -1
// x = y if and only if compare(x, y) = 0
// x > y if and only if compare(x, y) = 1

import { Ord, fromCompare } from 'fp-ts/Ord'


// Reflexivity
// Antisymmetry
// Transitivity
// const OrdNumber: Ord<number> = {
//   equals: (first, second) => first === second,
//   compare: (first, second) =>
//     (first < second ? -1 : first > second ? 1 : 0)
// }
const OrdNumber: Ord<number> =
  fromCompare((first, second) =>
             first < second ? -1 
               : first > second ? 1 : 0)
