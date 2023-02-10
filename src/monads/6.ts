import * as IO from 'fp-ts/IO'
import { now } from 'fp-ts/Date'
import { log } from 'fp-ts/Console'
import { pipe } from 'fp-ts/function'

import * as fs from 'fs'
import * as path from 'path'

const FILE_PATH = path.resolve(__dirname, 'file.txt')

const readFile =
  (filename: string): IO.IO<string> =>
    () => fs.readFileSync(filename, 'utf-8')

const time =
  <A>(ma: IO.IO<A>): IO.IO<A> =>
    pipe(
      now,
      IO.chain(startMillis =>
        pipe(
          ma,
          IO.chain(a =>
            pipe(
              now,
              IO.chain(endMillis =>
                pipe(
                  log(`Elapsed: ${endMillis - startMillis}`),
                  IO.map(() => a)
                )
              ))
          ))
      )
    )


const program = pipe(
  time(readFile(FILE_PATH)),
)

program()

