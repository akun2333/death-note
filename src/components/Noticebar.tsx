import { NoticeBar } from 'antd-mobile'

export const Noticebar = ({ data = '' }: { data?: string }) => {
  return (
    <div className="w-full">
      <NoticeBar
        className="!rounded-lg !border-none !bg-white"
        icon={false}
        content={data}
        color="info"
      />
    </div>
  )
}
