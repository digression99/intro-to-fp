// draw shapes on canvas

import { pipe } from 'fp-ts/function'
import { Monoid, concatAll } from 'fp-ts/Monoid'

const { abs, sqrt, pow } = Math

interface Point {
  readonly x: number
  readonly y: number
}

// Shape is a function
type Shape = (point: Point) => boolean

// euclidean distance
const distance = (p1: Point, p2: Point) =>
  sqrt(
    pow(abs(p1.x - p2.x), 2) +
    pow(abs(p1.y - p2.y), 2)
  )

const disk =
  (center: Point, radius: number): Shape =>
    (point) => distance(point, center) <= radius

const outside =
  (s: Shape): Shape => (point) => !s(point)

const MonoidUnion: Monoid<Shape> = {
  concat: (first, second) =>
    (point) => first(point) || second(point),
  empty: () => false
}

const MonoidIntersection: Monoid<Shape> = {
  concat: (first, second) =>
    (point) => first(point) && second(point),
  empty: () => true
}

const ring = (
  point: Point,
  bigRadius: number,
  smallRadius: number
): Shape =>
  MonoidIntersection.concat(
    disk(point, bigRadius),
    outside(disk(point, smallRadius))
  )

// example
const mickeymouse: ReadonlyArray<Shape> = [
  disk({ x: 200, y: 200 }, 100),
  disk({ x: 130, y: 100 }, 60),
  disk({ x: 280, y: 100 }, 60)
]
// pipe(concatAll(MonoidUnion)(mickeymouse), draw)

function draw(shape: Shape): void {
  const canvas: HTMLCanvasElement =
    document.getElementById('canvas') as any
  const ctx: CanvasRenderingContext2D =
    canvas.getContext('2d') as any
  const width = canvas.width
  const height = canvas.height
  const imagedata = ctx.createImageData(width, height)

  for (let x = 0; x < width; ++x) {
    for (let y = 0; y < height; ++y) {
      const point: Point = { x, y }
      if (shape(point)) {
        const pixelIndex = (point.y * width + point.x) * 4
        imagedata.data[pixelIndex] = 0
        imagedata.data[pixelIndex + 1] = 0
        imagedata.data[pixelIndex + 2] = 0
        imagedata.data[pixelIndex + 3] = 255
      }
    }
  }

  ctx.putImageData(imagedata, 0, 0)
}
