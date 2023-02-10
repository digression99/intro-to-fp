// inject the dependencies which the program needs.

import { IO } from 'fp-ts/IO'
import { pipe } from 'fp-ts/function'
import { log } from 'fp-ts/Console'
import { chain } from 'fp-ts/IO'
import * as path from 'path'
import * as fs from 'fs'

const FILE_PATH = path.resolve(__dirname, 'file.txt')

// hexagonal architecture
interface Deps {
  readonly readFile: (filename: string) => IO<string>
  readonly writeFile: (filename: string, data: string) => IO<void>
  readonly log: <A>(a: A) => IO<void>
  readonly chain: <A, B>(f: (a: A) => IO<B>) =>
    (ma: IO<A>) => IO<B>
}

const program = (D: Deps) => {
  const modifyFile =
    (filename: string, f: (s: string) => string) =>
      pipe(
        D.readFile(filename),
        D.chain(s => D.writeFile(filename, f(s)))
      )
  return pipe(
    D.readFile(FILE_PATH),
    D.chain(D.log),
    D.chain(() => modifyFile(FILE_PATH, s => s + '\n// eof')),
    D.chain(() => D.readFile(FILE_PATH)),
    D.chain(D.log)
  )
}

const DepsSync: Deps = {
  readFile:
    (filename) => () =>
      fs.readFileSync(filename, 'utf-8'),
  writeFile:
    (filename: string, data: string) => () =>
      fs.writeFileSync(filename, data, { encoding: 'utf-8' }),
  log,
  chain
}

program(DepsSync)()
