// model
interface RetryStatus {
  readonly iterNumber: number
  readonly previousDelay: number | undefined
}

const startStatus: RetryStatus = {
  iterNumber: 0,
  previousDelay: undefined
}

interface RetryPolicy {
  (status: RetryStatus): number | undefined
}

// premitives
const constantDelay = (delay: number): RetryPolicy =>
  () => delay
const limitRetries = (i: number): RetryPolicy =>
  (status) => status.iterNumber >= 1 ? undefined : 0

const exponentialBackoff =
  (delay: number): RetryPolicy =>
    (status) => delay * Math.pow(2, status.iterNumber)

// combinators
const capDelay = (maxDelay: number) =>
  (policy: RetryPolicy): RetryPolicy =>
    (status) => {
      const delay = policy(status)
      return delay === undefined
        ? undefined
        : Math.min(maxDelay, delay)
    }

const concat = (second: RetryPolicy) =>
  (first: RetryPolicy): RetryPolicy =>
    (status) => {
      const delay1 = first(status)
      const delay2 = second(status)
      if (delay1 !== undefined && delay2 !== undefined)
        return Math.max(delay1, delay2)
      return undefined
    }

import { Semigroup } from 'fp-ts/Semigroup'
const SemigroupRetryPolicy: Semigroup<RetryPolicy> = {
  concat: (first, second) => concat(first)(second)
}

// test
const applyPolicy = (policy: RetryPolicy) =>
  (status: RetryStatus): RetryStatus => ({
    iterNumber: status.iterNumber + 1,
    previousDelay: policy(status)
  })

const dryRun =
  (policy: RetryPolicy): ReadonlyArray<RetryStatus> => {
    const apply = applyPolicy(policy)
    let status: RetryStatus = apply(startStatus)
    const out: Array<RetryStatus> = [status]
    while (status.previousDelay !== undefined) {
      out.push((status = apply(out[out.length - 1])))
    }

    return out
  }

import { pipe } from 'fp-ts/function'

const myPolicy = pipe(
  constantDelay(300),
  concat(exponentialBackoff(200)),
  concat(limitRetries(5)),
  capDelay(2000)
)

console.log(dryRun(myPolicy))
