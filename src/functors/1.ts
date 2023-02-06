// side effects
// - define a DSL
// - use a thunk

// using thunk
type IO<A> = () => A
type Task<A> = () => Promise<A>
type Reader<R, A> = (r: R) => A

const log = (message: string): IO<void> => {
  // return thunk
  return () => console.log(message)
}

const main = log('hello')

main()
