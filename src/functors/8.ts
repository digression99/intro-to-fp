// functional error handling

import { pipe } from 'fp-ts/function'
import { map, Option } from 'fp-ts/Option'
import { findIndex } from 'fp-ts/ReadonlyArray'

const doSomethingWithIndex = (index: number) => {
  return `${index}`
}

const program =
  (ns: ReadonlyArray<number>): Option<string> =>
    pipe(
      ns,
      findIndex(n => n > 0),
      map(doSomethingWithIndex)
    )


const ns = [1, 2, 3, 4, 5]
console.log(
  program(ns)
)
