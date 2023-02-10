// error handling on read/write file

import { Task } from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import * as path from 'path'
import * as fs from 'fs'
import { log } from 'fp-ts/Console'
import { chain, fromIO } from 'fp-ts/TaskEither'

const FILE_PATH = path.resolve(__dirname, 'file.txt')

interface FileSystem<A> extends Task<E.Either<Error, A>> { }

interface Deps {
  readonly readFile:
  (filename: string) => FileSystem<string>
  readonly writeFile:
  (filename: string, data: string) => FileSystem<void>
  readonly log: <A>(a: A) => FileSystem<void>
  readonly chain: <A, B>(f: (a: A) => FileSystem<B>) =>
    (ma: FileSystem<A>) => FileSystem<B>
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
    D.chain(
      () => modifyFile(FILE_PATH, s => s + '\n// eof')
    ),
    D.chain(
      () => D.readFile(FILE_PATH)
    ),
    D.chain(D.log)
  )
}

const DepsAsync: Deps = {
  readFile: (filename) => () =>
    new Promise(resolve =>
      fs.readFile(filename, { encoding: 'utf-8' }, (err, s) => {
        if (err !== null) {
          resolve(E.left(err))
          return
        }
        resolve(E.right(s))
      })),
  writeFile: (filename: string, data: string) =>
    () =>
      new Promise(resolve =>
        fs.writeFile(filename, data, err => {
          if (err !== null) {
            resolve(E.left(err))
            return
          }
          resolve(E.right(undefined))
        })
      ),
  log: a => fromIO(log(a)),
  chain
}

program(DepsAsync)().then(console.log)
