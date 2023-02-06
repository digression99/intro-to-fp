// example - vscode settings

import { Monoid, struct } from 'fp-ts/Monoid'
import {
  getMonoid,
  none,
  Option,
  some
} from 'fp-ts/Option'
import { last } from 'fp-ts/Semigroup'

interface Settings {
  readonly fontFamily: Option<string>
  readonly fontSize: Option<number>
  readonly maxColumn: Option<number>
}

// choose the last one
const monoidSettings: Monoid<Settings> = struct({
  fontFamily: getMonoid(last()),
  fontSize: getMonoid(last()),
  maxColumn: getMonoid(last()),
})

const workspaceSettings: Settings = {
  fontFamily: some('Courier'),
  fontSize: none,
  maxColumn: some(80)
}

const userSettings: Settings = {
  fontFamily: some('Fira Code'),
  fontSize: some(12),
  maxColumn: none
}

const finalSetting =
  monoidSettings.concat(
    workspaceSettings,
    userSettings
  )

console.log(finalSetting)
