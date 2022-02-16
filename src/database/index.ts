import { readFileSync, writeFileSync } from 'fs'

export const database = './data.json'

export const find = ({ tags }: { tags?: string[] } = {}) => {
  const data = getStorage()
  if (!tags) return data
  return data.filter(value => !tags.map(tag => value.tags.includes(tag)).includes(false))
}

export const findOne = ({ id = '', tags = [''] }) => {
  return find({ tags }).filter(({ _id }) => _id == id)[0] ?? []
}

export const save = (items: INote[]) => {
  setStorage(items)
  return items
}

export const saveOne = (item: INote) => {
  const { _id } = item
  const data = find()
  setStorage([item, ...data.filter(value => value._id != _id)])
  return item
}

export const del = () => {
  reset()
  return true
}

export const delOne = (id: string) => {
  save(find().filter(({ _id }) => _id != id))
  return true
}

export const reset = () => setStorage([])

export const getStorage = () => {
  return JSON.parse(readFileSync(database).toString()) as INote[]
}

export const setStorage = (data: INote[]) => {
  writeFileSync(database, JSON.stringify(data))
}

export type INote = {
  _id: string
  title: string
  content: string
  tags: string[]
}
