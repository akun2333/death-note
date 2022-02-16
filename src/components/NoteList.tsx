import { Card, InfiniteScroll, List, SwipeAction, Tag } from 'antd-mobile'
import { Action } from 'antd-mobile/es/components/swipe-action'

export const NoteList = ({
  data = [],
  hasMore = false,
  rightActions = {
    key: 'delete',
    text: 'delete',
    color: 'danger'
  },
  loadMore,
  handlerDelItem,
  handlerListItem,
  handlerTags
}: INoteList) => {
  const TagsList = ({ tags }: { tags: string[] }) => {
    return (
      <div className="flex">
        {tags.map((value, key) => (
          <Tag
            className="mr-2"
            color="primary"
            fill="outline"
            key={key}
            onClick={e => {
              e.stopPropagation()
              handlerTags(value)
            }}
          >
            #{value}
          </Tag>
        ))}
      </div>
    )
  }
  return (
    <div>
      {data.map(({ _id, title, content, tags }, key) => (
        <Card
          className="mb-4"
          title={title || '无标题'}
          key={key}
          onClick={() => handlerListItem(_id)}
        >
          <SwipeAction
            rightActions={[
              {
                ...rightActions,
                onClick: e => {
                  e.stopPropagation()
                  handlerDelItem(key)
                }
              }
            ]}
          >
            <List.Item>{content || '暂无内容'}</List.Item>
            <TagsList tags={tags} />
          </SwipeAction>
        </Card>
      ))}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  )
}

export type INoteListData = {
  _id: string
  title: string
  content: string
  tags: string[]
}
export type INoteList = {
  data?: INoteListData[]
  hasMore?: boolean
  rightActions?: Action
  loadMore: () => Promise<void>
  handlerDelItem: (key: number) => void
  handlerListItem: (_id: string) => void
  handlerTags: (tag: string) => void
}
