import { Input, TextArea } from 'antd-mobile'

export const NoteDetail = ({
  title = '',
  content = '',
  handlerTitle = (val: string) => {},
  handlerContent = (val: string) => {}
}) => {
  return (
    <div>
      <Input
        className="mb-4 text-lg font-bold"
        placeholder="Title"
        value={title}
        onChange={handlerTitle}
      ></Input>
      <TextArea
        placeholder="Enter here"
        autoSize
        value={content}
        onChange={handlerContent}
      ></TextArea>
    </div>
  )
}
