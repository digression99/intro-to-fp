// Option for Ord
// Could be used on sort/max/min/etc...

import * as N from 'fp-ts/number'
import {
  getOrd,
  Option,
  some
} from 'fp-ts/Option'
import { tuple } from 'fp-ts/Ord'
import * as S from 'fp-ts/string'

type MyTuple = readonly [string, number]

const OrdMyTuple = tuple<MyTuple>(S.Ord, N.Ord)

const OrdOptionMyTuple = getOrd(OrdMyTuple)

const o1: Option<MyTuple> = some(['a', 1])
const o2: Option<MyTuple> = some(['a', 2])
const o3: Option<MyTuple> = some(['b', 1])

console.log(
  OrdOptionMyTuple.compare(o1, o1),
  OrdOptionMyTuple.compare(o1, o2),
  OrdOptionMyTuple.compare(o1, o3),
  OrdOptionMyTuple.compare(o2, o3),
)

