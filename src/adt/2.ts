// pattern matching

function module1() {
  interface Nil {
    readonly _tag: 'Nil'
  }

  interface Cons<A> {
    readonly _tag: 'Cons'
    readonly head: A
    readonly tail: List<A>
  }

  type List<A> = Nil | Cons<A>

  const match =
    <R, A>(
      onNil: () => R,
      onCons: (head: A, tail: List<A>) => R
    ) => (fa: List<A>): R => {
      switch (fa._tag) {
        case 'Nil':
          return onNil()
        case 'Cons':
          return onCons(fa.head, fa.tail)
      }
    };

  const isEmpty = match(
    () => true,
    () => false
  )

  const head = match(
    () => undefined,
    (head, _tail) => head
  )

  const length: <A>(fa: List<A>) => number = match(
    () => 0,
    (_, tail) => 1 + length(tail)
  )
}

module1()
