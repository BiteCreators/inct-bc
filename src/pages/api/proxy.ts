import type { NextApiRequest, NextApiResponse } from 'next'

import { Readable } from 'stream'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path } = req.query

  if (!path || Array.isArray(path)) {
    res.status(400).json({ message: 'Invalid path' })

    return
  }

  const imageUrl = path.startsWith('http')
    ? path
    : `https://staging-it-incubator.s3.eu-central-1.amazonaws.com/${path}`

  try {
    const response = await fetch(imageUrl as string)

    if (!response.ok) {
      res.status(response.status).end()

      return
    }

    response.headers.forEach((value, key) => {
      res.setHeader(key, value)
    })

    const readableStream = response.body

    if (readableStream) {
      const asyncIterable = Readable.from(readableStream as unknown as AsyncIterable<Uint8Array>)

      asyncIterable.pipe(res)
    } else {
      res.status(500).json({ message: 'Failed to fetch image' })
    }
  } catch (error) {
    console.error('Proxy error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
