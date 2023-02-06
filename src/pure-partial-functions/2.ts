// adt - product, sum type
// an algebraic data type specifies
// a sum of one or more alternatives,
// where each alternative is
// a product of zero or more fields.

type Tuple1 = [string]
type Tuple2 = [string, number]
type Tuple3 = [string, number, boolean]

interface Person {
  name: string
  age: number
}

type Name = Person['name']
type Age = Person['age']

type HttpResponse<A> = {
  readonly code: number
  readonly body: A
}

// sum type

type StringsOrNumbers =
  ReadonlyArray<string> |
  ReadonlyArray<number>

declare const sn: StringsOrNumbers

function module1() {
  // sn.map((a) => a)
  type List<A> =
    | { readonly _tag: 'Nil' }
    | {
      readonly _tag: 'Cons';
      readonly head: A;
      readonly tail: List<A>
    }

  const ls1: List<number> = { _tag: 'Nil' }
  const ls2: List<number> = {
    _tag: 'Cons',
    head: 10,
    tail: ls1
  }

  console.log(ls1, ls2)
}


module1()
