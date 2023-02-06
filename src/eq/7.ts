import { pipe } from 'fp-ts/function'
import { Eq, struct, contramap } from 'fp-ts/Eq'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'

type User = {
  readonly id: number
  readonly name: string
}

const EqStandard: Eq<User> = struct({
  id: N.Eq,
  name: S.Eq
})

const EqID: Eq<User> = {
  equals:
    (first, second) =>
      N.Eq.equals(first.id, second.id)
}

const EqID2: Eq<User> = pipe(
  N.Eq,
  contramap((user: User) => user.id)
)

console.log(
  EqStandard.equals({
    id: 1,
    name: 'Giulio'
  }, {
    id: 1,
    name: 'Giulio Canti'
  })
)

console.log(
  EqID.equals({
    id: 1,
    name: 'Giulio'
  }, {
    id: 1,
    name: 'Giulio Canti'
  })
)

console.log(
  EqID2.equals({
    id: 1,
    name: 'Giulio'
  }, {
    id: 1,
    name: 'Giulio Canti'
  })
)
