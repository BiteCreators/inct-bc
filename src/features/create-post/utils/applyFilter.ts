import { RefObject } from 'react'

import { Filters } from '../types'

export const applyFilter = ({
  canvas,
  ctx,
  filter,
  imgRef,
}: {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  filter: Filters
  imgRef: RefObject<HTMLImageElement | null>
}) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

  const vignetteData = ctx.createImageData(imageData)
  const { height, width } = canvas

  const pixelSize = 10 // Размер пикселя
  const tempCanvas = document.createElement('canvas')
  const tempCtx = tempCanvas.getContext('2d')

  switch (filter) {
    case 'vignette':
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4
          const distance = Math.sqrt((x - width / 2) ** 2 + (y - height / 2) ** 2)
          const maxDistance = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2)
          const factor = 1 - distance / maxDistance

          vignetteData.data[index] = imageData.data[index] * factor // R
          vignetteData.data[index + 1] = imageData.data[index + 1] * factor // G
          vignetteData.data[index + 2] = imageData.data[index + 2] * factor // B
          vignetteData.data[index + 3] = imageData.data[index + 3] // Alpha
        }
      }
      ctx.putImageData(vignetteData, 0, 0)

      return
    case 'posterize':
      if (imageData) {
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.floor(data[i] / 64) * 64 // R
          data[i + 1] = Math.floor(data[i + 1] / 64) * 64 // G
          data[i + 2] = Math.floor(data[i + 2] / 64) * 64 // B
        }
        ctx.putImageData(imageData, 0, 0)
      }

      return
    case 'heatmap':
      if (imageData) {
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3

          data[i] = avg // R
          data[i + 1] = 0 // G
          data[i + 2] = 255 - avg // B
        }
        ctx.putImageData(imageData, 0, 0)
      }

      return
    case 'contrast':
      ctx.filter = 'contrast(200%)' // Увеличение контрастности
      ctx.drawImage(imgRef.current!, 0, 0, canvas.width, canvas.height)

      return
    case 'brightness':
      ctx.filter = 'brightness(150%)' // Увеличение яркости
      ctx.drawImage(imgRef.current!, 0, 0, canvas.width, canvas.height)

      return
    case 'pixelate':
      if (tempCtx) {
        tempCanvas.width = canvas.width
        tempCanvas.height = canvas.height
        tempCtx.drawImage(imgRef.current!, 0, 0, canvas.width, canvas.height)
        const tempImageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height)

        for (let y = 0; y < canvas.height; y += pixelSize) {
          for (let x = 0; x < canvas.width; x += pixelSize) {
            const pixelIndex = (y * canvas.width + x) * 4
            const avgR = tempImageData.data[pixelIndex]
            const avgG = tempImageData.data[pixelIndex + 1]
            const avgB = tempImageData.data[pixelIndex + 2]

            // Заполняем блок пикселей одним цветом
            for (let dy = 0; dy < pixelSize; dy++) {
              for (let dx = 0; dx < pixelSize; dx++) {
                if (x + dx < canvas.width && y + dy < canvas.height) {
                  const newIndex = ((y + dy) * canvas.width + (x + dx)) * 4

                  tempImageData.data[newIndex] = avgR
                  tempImageData.data[newIndex + 1] = avgG
                  tempImageData.data[newIndex + 2] = avgB
                }
              }
            }
          }
        }
        ctx.putImageData(tempImageData, 0, 0)
      }

      return
    case 'sepia':
      if (imageData) {
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          const tr = 0.393 * data[i] + 0.769 * data[i + 1] + 0.189 * data[i + 2]
          const tg = 0.349 * data[i] + 0.686 * data[i + 1] + 0.168 * data[i + 2]
          const tb = 0.272 * data[i] + 0.534 * data[i + 1] + 0.131 * data[i + 2]

          data[i] = tr > 255 ? 255 : tr // R
          data[i + 1] = tg > 255 ? 255 : tg // G
          data[i + 2] = tb > 255 ? 255 : tb // B
        }
        ctx.putImageData(imageData, 0, 0)
      }

      return
    case 'grayscale':
      if (imageData) {
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3

          data[i] = data[i + 1] = data[i + 2] = avg // RGB
        }
        ctx.putImageData(imageData, 0, 0)
      }

      return
    case 'negative':
      if (imageData) {
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i] // R
          data[i + 1] = 255 - data[i + 1] // G
          data[i + 2] = 255 - data[i + 2] // B
        }
        ctx.putImageData(imageData, 0, 0)
      }

      return
    case 'threshold':
      if (imageData) {
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
          const value = avg < 128 ? 0 : 255

          data[i] = data[i + 1] = data[i + 2] = value // RGB
        }
        ctx.putImageData(imageData, 0, 0)
      }

      return
    case 'sharpen':
      if (imageData) {
        const data = imageData.data
        const sharpenedData = ctx.createImageData(imageData)

        const kernel = [
          [0, -1, 0],
          [-1, 5, -1],
          [0, -1, 0],
        ]

        for (let y = 1; y < canvas.height - 1; y++) {
          for (let x = 1; x < canvas.width - 1; x++) {
            let r = 0,
              g = 0,
              b = 0

            for (let ky = -1; ky <= 1; ky++) {
              for (let kx = -1; kx <= 1; kx++) {
                const pixelIndex = ((y + ky) * canvas.width + (x + kx)) * 4

                r += data[pixelIndex] * kernel[ky + 1][kx + 1]
                g += data[pixelIndex + 1] * kernel[ky + 1][kx + 1]
                b += data[pixelIndex + 2] * kernel[ky + 1][kx + 1]
              }
            }

            const newIndex = (y * canvas.width + x) * 4

            sharpenedData.data[newIndex] = Math.min(Math.max(r, 0), 255)
            sharpenedData.data[newIndex + 1] = Math.min(Math.max(g, 0), 255)
            sharpenedData.data[newIndex + 2] = Math.min(Math.max(b, 0), 255)
            sharpenedData.data[newIndex + 3] = 255 // Alpha
          }
        }

        ctx.putImageData(sharpenedData, 0, 0)
      }

      return
    case 'blur':
      ctx.filter = 'blur(5px)'
      ctx.drawImage(imgRef.current!, 0, 0, canvas.width, canvas.height)

      return
    case 'original':
      ctx.filter = 'original'
      ctx.drawImage(imgRef.current!, 0, 0, canvas.width, canvas.height)

      return
  }
}
