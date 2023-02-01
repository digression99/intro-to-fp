import { pipe, flow } from 'fp-ts/function'

function increment(n: number) {
  return n + 1
}

function decrement(n: number) {
  return n - 1
}

function double(n: number) {
  return n * 2
}

const n = 10

const program1 = pipe(n, increment, double, decrement)

console.log(program1)

const program2 = flow(increment, double, decrement)

console.log(program2(n))


