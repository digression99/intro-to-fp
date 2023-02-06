// Eq for Option<readonly [string, number]>

import { tuple } from 'fp-ts/Eq'
import * as N from 'fp-ts/number'
import {
  getEq,
  Option,
  some
} from 'fp-ts/Option'
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'

type MyTuple = readonly [string, number]

const EqMyTuple = tuple<MyTuple>(S.Eq, N.Eq)

const EqOptionMyTuple =
  getEq(EqMyTuple)

const o1: Option<MyTuple> = some(['a', 1])
const o2: Option<MyTuple> = some(['a', 2])
const o3: Option<MyTuple> = some(['b', 1])
const o4: Option<MyTuple> = some(['a', 2])

console.log(
  EqOptionMyTuple.equals(o1, o1),
  EqOptionMyTuple.equals(o1, o2),
  EqOptionMyTuple.equals(o1, o3),
  EqOptionMyTuple.equals(o2, o4),
)
