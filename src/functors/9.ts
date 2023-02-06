// demo

import { Endomorphism } from 'fp-ts/Endomorphism'
import * as R from 'fp-ts/Reader'

type Color = {
  readonly red: number
  readonly green: number
  readonly blue: number
}

type Point = {
  readonly x: number
  readonly y: number
}

type Image<A> = R.Reader<Point, A>

const color =
  (red: number,
    green: number,
    blue: number): Color => ({
      red, green, blue
    })

const BLACK: Color = color(0, 0, 0)
const WHITE: Color = color(255, 255, 255)

const brightness = (color: Color): number =>
  (color.red + color.green + color.blue) / 3

const grayscale = (c: Color): Color => {
  const n = brightness(c)
  return color(n, n, n)
}

const invert = (c: Color): Color =>
  color(
    255 - c.red,
    255 - c.green,
    255 - c.red
  )

const threshold = (c: Color): Color =>
  brightness(c) < 100 ? BLACK : WHITE

function main(f: Endomorphism<Image<Color>>) {
  const canvas: HTMLCanvasElement =
    document.getElementById('canvas') as any
  const ctx: CanvasRenderingContext2D =
    canvas.getContext('2d') as any
  const bird: HTMLImageElement =
    document.getElementById('bird') as any

  bird.onload = function() {
    // interface ImageData {
    //     readonly colorSpace: PredefinedColorSpace;
    //     /** Returns the one-dimensional array containing the data in RGBA order, as integers in the range 0 to 255. */
    //     readonly data: Uint8ClampedArray;
    //     /** Returns the actual dimensions of the data in the ImageData object, in pixels. */
    //     readonly height: number;
    //     /** Returns the actual dimensions of the data in the ImageData object, in pixels. */
    //     readonly width: number;
    // }
    //
    function getImage(imageData: ImageData): Image<Color> {
      const data = imageData.data

      return loc => {
        const pos = loc.x * 4 + loc.y * 632 * 4
        return color(
          data[pos],
          data[pos + 1],
          data[pos + 2]
        )
      }
    }

    function setImage(imageData: ImageData, image: Image<Color>): void {
      const data = imageData.data

      for (let x = 0; x < 632; ++x) {
        for (let y = 0; y < 421; ++y) {
          const pos = x * 4 + y * 632 * 4
          const { red, green, blue } = image({ x, y })

          data[pos] = red
          data[pos + 1] = green
          data[pos + 2] = blue
        }
      }
      ctx.putImageData(imageData, 0, 0)
    }

    ctx.drawImage(bird, 0, 0)
    const imageData = ctx.getImageData(0, 0, 632, 421)
    setImage(imageData, f(getImage(imageData)))
  }
}

main(R.map((c: Color) => c))
