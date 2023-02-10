//read/write to a file.

import { log } from 'fp-ts/Console'
import { IO, chain } from 'fp-ts/IO'
import { pipe } from 'fp-ts/function'
import * as fs from 'fs'
import * as path from 'path'

const FILE_PATH = path.resolve(__dirname, 'file.txt')

const readFile = (filename: string): IO<string> =>
  () =>
    fs.readFileSync(filename, 'utf-8')

const writeFile =
  (filename: string, data: string): IO<void> =>
    () => fs.writeFileSync(filename, data, { encoding: 'utf-8' })

const modifyFile =
  (filename: string, f: (s: string) => string): IO<void> =>
    pipe(
      readFile(filename),
      chain(s => writeFile(filename, f(s)))
    )

const program1 = pipe(
  readFile(FILE_PATH),
  chain(log),
  chain(() => modifyFile(FILE_PATH, s => s + '\n// eof')),
  chain(() => readFile(FILE_PATH)),
  chain(log)
)

program1()

// or
const read = pipe(readFile(FILE_PATH), chain(log))
const modify = modifyFile(FILE_PATH, s => s + '\n// eof')

const program2 = pipe(
  read,
  chain(() => modify),
  chain(() => read),
)

program2()

// or
const interleave =
  <A, B>(action: IO<A>, middle: IO<B>): IO<A> =>
    pipe(
      action,
      chain(() => middle),
      chain(() => action)
    )

const program3 = interleave(read, modify)

program3()


