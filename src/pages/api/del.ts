import { NextApiRequest, NextApiResponse } from 'next'
import { del, delOne } from '../../database'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { _id } = req.query
  res.json({ data: _id ? delOne(String(_id)) : del() })
}
