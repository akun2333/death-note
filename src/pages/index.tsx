import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AddOutline } from 'antd-mobile-icons'
import { Navbar, NoteList, INoteListData, Noticebar } from '@components'

export default () => {
  const router = useRouter()
  const [title, setTitle] = useState('Death note')
  const [backArrow, setBackArrow] = useState(false)
  const [data, setData] = useState<INoteListData[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [sentence, setSentence] = useState('')

  const handleNote = () => router.push('/note')

  const handleListItem = (_id: string) => {
    router.push(`/note?_id=${_id}`)
  }

  const handleDelItem = async (key: number) => {
    setData(value =>
      value.filter(({ _id }, k) => {
        if (k == key) axios.request({ method: 'GET', url: '/api/del', params: { _id } })
        return k != key
      })
    )
  }

  const handleTags = async (tags: string) => {
    await router.replace(`/?tags=${tags}`)
    router.reload()
  }

  const handleLoadMore = async () => {
    const tags = new URL(location.href).searchParams.get('tags')
    const { data } = await axios.request<any[]>({
      method: 'GET',
      url: '/api/find',
      params: { page: page + 1, tags }
    })
    setPage(page + 1)
    setData(val => [...val, ...data])
    setHasMore(data.length > 0)
  }

  const watchTags = useEffect(() => {
    const { tags } = router.query
    if (!tags) return
    setTitle(`Tags: ${String(tags)}`)
    setBackArrow(true)
  }, [router])

  const loadSentence = useEffect(() => {
    axios
      .request<{ hitokoto: string }>({
        method: 'GET',
        url: 'https://v1.hitokoto.cn'
      })
      .then(({ data: { hitokoto } }) => {
        setSentence(hitokoto)
      })
  }, [])

  return (
    <div className='flex flex-col h-screen'>
      <Navbar
        sticky
        backArrow={backArrow}
        title={title}
        right={<AddOutline onClick={handleNote} />}
      />
      <div className='flex-1 bg-gray-50 p-4'>
        <div className='w-full mb-4'>
          <Noticebar data={sentence} />
        </div>

        <NoteList
          data={data}
          hasMore={hasMore}
          loadMore={handleLoadMore}
          handleDelItem={handleDelItem}
          handleListItem={handleListItem}
          handleTags={handleTags}
        />
      </div>
    </div>
  )
}
