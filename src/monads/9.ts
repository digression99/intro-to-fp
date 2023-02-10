// abstraction of FileSystem

import { Task, chain, fromIO } from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import { log } from 'fp-ts/Console'
import * as path from 'path'
import * as fs from 'fs'

const FILE_PATH = path.resolve(__dirname, 'file.txt')

interface FileSystem<A> extends Task<A> { }

interface Deps {
  readonly readFile:
  (filename: string) => FileSystem<string>
  readonly writeFile:
  (filename: string, data: string) => FileSystem<void>
  readonly log: <A>(a: A) => FileSystem<void>
  readonly chain: <A, B>(f: (a: A) => FileSystem<B>) =>
    (ma: FileSystem<A>) => FileSystem<B>
}

// const DepsSync: Deps = {
//   readFile: (filename) => () =>
//     fs.readFileSync(filename, 'utf-8'),
//   writeFile: (filename: string, data: string) => () =>
//     fs.writeFileSync(filename, data, { encoding: 'utf-8' }),
//   log,
//   chain
// }
//
const DepsAsync: Deps = {
  readFile: (filename) => () =>
    new Promise(resolve =>
      fs.readFile(filename, { encoding: 'utf-8' }, (_, s) => resolve(s))
    ),
  writeFile: (filename: string, data: string) => () =>
    new Promise(resolve => fs.writeFile(filename, data, () => resolve())),
  log: a => fromIO(log(a)),
  chain
}

const program1 =
  (D: Deps) => {
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

program1(DepsAsync)()
