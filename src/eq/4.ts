
type Point = {
  readonly x: number
  readonly y: number
}

const points: Set<Point> = new Set([
  { x: 0, y: 0 }
])

points.add({ x: 0, y: 0 })
console.log(points)
