import { NextApiRequest, NextApiResponse } from 'next'

const translate = require('node-google-translate-skidz')

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { source, target, text } = req.query

  if (!source || !target || !text) {
    return res.status(400).json({ error: 'Missing parameters' })
  }

  translate(
    {
      source,
      target,
      text,
    },
    function (result: any) {
      if (result.error) {
        return res.status(500).json({ error: 'Translation failed' })
      }

      const translatedText = result.translation

      res.status(200).json({ translatedText })
    }
  )
}
