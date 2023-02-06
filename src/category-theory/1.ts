import { pipe } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'

const double = (n: number): number => n * 2

const program = (input: ReadonlyArray<number>) =>
  pipe(
    input,
    RA.head,
    double
  )
