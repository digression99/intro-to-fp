// flatten

import { pipe } from 'fp-ts/function'
import * as A from 'fp-ts/ReadonlyArray'

const followersOfFollowers =
  pipe(
    user,
    getFollowers,
    A.map(getFollowers),
    A.flatten
  )

console.log(followersOfFollowers)
