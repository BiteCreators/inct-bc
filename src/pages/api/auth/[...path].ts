import type { NextApiRequest, NextApiResponse } from 'next'

const API_BASE_URL = process.env.NEXT_PUBLIC_WS_API_URL

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const pathSegments = req.query.path as string[]
  const backendPath = pathSegments.join('/')

  const backendUrl = `${API_BASE_URL}/api/v1/auth/${backendPath}`

  console.log('Proxying to:', backendUrl)

  try {
    const response = await fetch(backendUrl, {
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && {
          Authorization: req.headers.authorization,
        }),
      },
      method: req.method,
    })

    const setCookie = response.headers.get('set-cookie')

    if (setCookie) {
      res.setHeader('Set-Cookie', setCookie)
    }

    const data = await response.json()

    res.status(response.status).json(data)
  } catch (error) {
    console.error('Proxy error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
