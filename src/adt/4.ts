// Eq with Option

import { pipe } from 'fp-ts/function'
import { match, Option } from 'fp-ts/Option'

declare const o1: Option<string>
declare const o2: Option<string>

// every possible cases covered.
const result: boolean = pipe(
  o1,
  match(
    () =>
      pipe(
        o2,
        match(
          () => true,
          () => false
        )
      ),
    (s1) =>
      pipe(
        o2,
        match(
          () => false,
          (s2) => s1 === s2
        )
      )
  )
)

