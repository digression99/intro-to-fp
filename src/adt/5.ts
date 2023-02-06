// generalize in a combinator getEq.

import { Eq } from 'fp-ts/Eq'
import { pipe } from 'fp-ts/function'
import {
  match,
  Option,
  none,
  some
} from 'fp-ts/Option'

// defined in fp-ts/Option
const getEq = <A>(E: Eq<A>): Eq<Option<A>> => ({
  equals: (first, second) =>
    pipe(
      first,
      match(
        () => pipe(
          second,
          match(
            () => true,
            () => false
          )
        ),
        (a1) => pipe(
          second,
          match(
            () => false,
            (a2) => E.equals(a1, a2)
          )
        )
      )
    )
})

import * as S from 'fp-ts/string'

const EqOptionString = getEq(S.Eq)

pipe(
  EqOptionString.equals(none, none),
  console.log
)

pipe(
  EqOptionString.equals(none, some('b')),
  console.log
)

pipe(
  EqOptionString.equals(some('a'), none),
  console.log
)

pipe(
  EqOptionString.equals(some('a'), some('b')),
  console.log
)

pipe(
  EqOptionString.equals(some('a'), some('a')),
  console.log
)




