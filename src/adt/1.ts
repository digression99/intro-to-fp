
type Action =
  | {
    readonly type: 'ADD_TODO'
    readonly text: string
  }
  | {
    readonly type: 'UPDATE_TODO'
    readonly id: number
    readonly text: string
    readonly completed: boolean
  }
  | {
    readonly type: 'DELETE_TODO'
    readonly id: number
  }

const add = (text: string): Action => ({
  type: 'ADD_TODO',
  text
})

const update = (
  id: number,
  text: string,
  completed: boolean
): Action => ({
  type: 'UPDATE_TODO',
  id,
  text,
  completed
})

const del = (id: number): Action => ({
  type: 'DELETE_TODO',
  id
})

function module1() {
  // ex2
  type List<A> =
    | { readonly _tag: 'Nil' }
    | { readonly _tag: 'Cons'; readonly head: A; readonly tail: List<A> }

  const nil: List<never> = { _tag: 'Nil' }

  const cons = <A>(head: A, tail: List<A>): List<A> => ({
    _tag: 'Cons',
    head,
    tail
  })

  const myList = cons(
    1,
    cons(2,
      cons(3,
        nil)
    )
  )

  console.log(myList)
}

module1()

