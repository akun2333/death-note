import { NextApiRequest, NextApiResponse } from 'next'
import { saveOne } from '../../database'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { _id, tags, title, content } = req.query
  res.json(
    saveOne({
      _id: String(_id ?? Date.now()),
      title: String(title ?? ''),
      content: String(content ?? ''),
      tags: tags ? String(tags).split('-') : []
    })
  )
}
