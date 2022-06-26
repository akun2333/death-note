import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Dialog, Input, Tag } from 'antd-mobile'
import { AddOutline, CheckOutline } from 'antd-mobile-icons'
import { Navbar, NoteDetail } from '@components'

export default () => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [now_id, setNow_id] = useState(Date.now().toString())

  const handleBack = async () => {
    saveNote()
    router.replace('/')
  }

  const handleTags = () => {
    const DialogContent = () => {
      const [labels, setLabels] = useState(tags)
      const [input, setInput] = useState('')

      const handleAddTags = () => {
        setLabels(value => [...value, input])
        setTags(value => [...value, input])
        setInput('')
      }

      const handleDelTags = (tag: string) => {
        setLabels(value => value.filter(v => v != tag))
        setTags(value => value.filter(v => v != tag))
      }

      return (
        <>
          {labels.map((value, key) => (
            <Tag
              className='mr-2'
              color='primary'
              fill='outline'
              key={key}
              onClick={() => handleDelTags(value)}
            >
              #{value} X
            </Tag>
          ))}
          <div className='flex justify-between w-full mt-4'>
            <Input
              placeholder='Enter new label here'
              value={input}
              onChange={val => setInput(val)}
            />
            <a onClick={handleAddTags}>Add</a>
          </div>
        </>
      )
    }

    Dialog.show({
      // header: 'Tags',
      title: 'Tags',
      closeOnAction: true,
      closeOnMaskClick: true,
      content: <DialogContent />
    })
  }

  const handleSave = () => {
    saveNote()
  }

  const handleTitle = (val: string) => {
    setTitle(val)
  }

  const handleContent = (val: string) => {
    setContent(val)
  }

  const saveNote = () => {
    axios.request({
      method: 'GET',
      url: '/api/save',
      params: { _id: now_id, title, content, tags: tags.toString().replaceAll(',', '-') }
    })
  }

  const watchNote = useEffect(() => {
    const { _id } = router.query
    ;(async () => {
      if (!_id) return
      const { data } = await axios.request({
        method: 'GET',
        url: '/api/find',
        params: { _id }
      })
      setNow_id(String(_id))
      setTitle(data.title)
      setContent(data.content)
      setTags(data.tags)
    })()
  }, [router])

  return (
    <div className='flex flex-col h-screen'>
      <Navbar
        backArrow={true}
        title={title}
        right={
          <>
            <AddOutline className='mr-2' onClick={handleTags} />
            <CheckOutline onClick={handleSave} />
          </>
        }
        handleBack={handleBack}
      />
      <div className='flex flex-col flex-1 px-4 pt-4'>
        <NoteDetail
          title={title}
          content={content}
          handleTitle={handleTitle}
          handleContent={handleContent}
        ></NoteDetail>
      </div>
    </div>
  )
}
