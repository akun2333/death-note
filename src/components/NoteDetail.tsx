import { Input, TextArea } from 'antd-mobile'

export const NoteDetail = ({
  title = '',
  content = '',
  handleTitle = (val: string) => {},
  handleContent = (val: string) => {}
}) => {
  return (
    <div>
      <Input
        className='mb-4 text-lg font-bold'
        placeholder='Title'
        value={title}
        onChange={handleTitle}
      ></Input>
      <TextArea
        placeholder='Enter here'
        autoSize
        value={content}
        onChange={handleContent}
      ></TextArea>
    </div>
  )
}
