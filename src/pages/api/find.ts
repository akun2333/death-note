import { NextApiRequest, NextApiResponse } from 'next'
import { find, findOne } from '@database'
import { chunk } from 'lodash'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { _id, tags, page = 1 } = req.query
  const tag = tags ? String(tags).split('-') : []
  res.json(
    (_id ? findOne({ id: String(_id), tags: tag }) : chunk(find({ tags: tag }), 10)[+page - 1]) ??
      []
  )
}
