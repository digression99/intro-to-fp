// contramap with Eq

import { map } from 'fp-ts/Option'
import { contramap } from 'fp-ts/Eq'
import { User } from './database'

const getId = (_: User): number => _.id

const getIdOption = map(getId)

const getIdEq = contramap(getId)

import * as N from 'fp-ts/number'

const EqID = getIdEq(N.Eq)


