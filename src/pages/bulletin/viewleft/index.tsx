import { useEffect, useState } from 'react'
import { BaseText } from '../../../components'
import { classNames } from '../../../utils/common'
import { PlusOutlined, DownOutlined } from '@ant-design/icons'
import { BoardLinkInterface, ThemaInterface } from '../../../entities'
import { BoardLinkApi } from '../../../apis/boardLinkApi'
import { useBulletinState } from '../store'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd'
import { CategoryApi } from '../../../apis/categoryApi'
import { showError } from '../../../utils/showToast'
import { BaseInput } from '../../../components/input/BaseInput'
import { BOARD } from '../../../utils/constants'

export const NEW_ID = 'NEW_ID'
export default function BulletinLeft() {
  const { boardSelected, setBoardSelected, setLastRefresh, lastRefresh } =
    useBulletinState((state) => state)
  const [boardLinks, setBoardLinks] = useState<Array<BoardLinkInterface>>([])
  const [linkCateDragging, setLinkCateDragging] = useState<number>()
  const [editBoardNameIndex, setBoardNameIndex] = useState()

  console.log(111, boardSelected)

  const _getBoardLinks = async () => {
    try {
      const respon = await BoardLinkApi.getList()
      setBoardLinks(respon)
    } catch (error) { }
  }

  const createBoardLink = async () => {
    try {
      const data = boardLinks.map((item) => item.id === NEW_ID)
      if (data[0]) return
      setBoardLinks([{ id: NEW_ID, name: 'New Link' }, ...boardLinks])
      setBoardSelected({ id: NEW_ID, name: 'New Link' })
    } catch (error) { }
  }

  useEffect(() => {
    _getBoardLinks()
  }, [lastRefresh])

  const orderLink = async (
    prev_index_number: number | undefined,
    next_index_number: number | undefined,
    linkIndex: number
  ) => {
    try {
      await BoardLinkApi.orderLink(boardLinks[linkIndex].id, {
        prev_index_number,
        next_index_number,
      })
      _getBoardLinks()
      setLastRefresh(Date.now())
    } catch (error) {
      showError(error)
      _getBoardLinks()
      setLastRefresh(Date.now())
    }
  }

  const onDragEnd = (result: any) => {
    try {
      if (!result.destination) {
        return
      }

      if (result.source.index < result.destination.index) {
        orderLink(
          boardLinks[result.destination.index]?.index,
          boardLinks[result.destination.index + 1]?.index,
          result.source.index
        )
      } else {
        orderLink(
          boardLinks[result.destination.index - 1]?.index,
          boardLinks[result.destination.index]?.index,
          result.source.index
        )
      }

      const newItems = [...boardLinks]
      const [reorderedItem] = newItems.splice(result.source.index, 1)
      newItems.splice(result.destination.index, 0, reorderedItem)
      setBoardLinks(newItems)
    } catch (error) { }
  }

  const orderLinkCategory = async (
    prev_index_number: number,
    next_index_number: number,
    id: string
  ) => {
    try {
      await CategoryApi.orderLinkCategory(id, {
        prev_index_number,
        next_index_number,
      })
      _getBoardLinks()
      setLastRefresh(Date.now())
    } catch (error) {
      showError(error)
      _getBoardLinks()
      setLastRefresh(Date.now())
      console.log('err', error)
    }
  }

  const updateEventThemas = async (data: BoardLinkInterface) => {
    try {
      await BoardLinkApi.update(data.id || '', data)
      _getBoardLinks()
      setLastRefresh(Date.now())
    } catch (error) {
      showError(error)
      _getBoardLinks()
      setLastRefresh(Date.now())
    }
  }

  const onDragEndCategory = (result: any, linkIndex: number) => {
    try {
      setLinkCateDragging(undefined)
      if (!result.destination) {
        return
      }

      //////////////////////////////////
      //////////////////////////////////
      if (boardLinks[linkIndex].route === BOARD.EVENT_BOARD) {
        const newItems = [...(boardLinks[linkIndex].themas || [])]
        const [reorderedItem]: any = newItems.splice(result.source.index, 1)
        newItems.splice(result.destination.index, 0, reorderedItem)
        updateEventThemas({
          ...boardLinks[linkIndex],
          themas: newItems.map((item: ThemaInterface) => item.id),
        })
        boardLinks[linkIndex].themas = newItems
        setBoardLinks(boardLinks)
      } else {
        //////////////////////////////////
        //////////////////////////////////
        if (result.source.index < result.destination.index) {
          orderLinkCategory(
            boardLinks[linkIndex].categories?.[result.destination.index]?.index,
            boardLinks[linkIndex].categories?.[result.destination.index + 1]
              ?.index,
            boardLinks[linkIndex].categories?.[result.source.index].id
          )
        } else {
          orderLinkCategory(
            boardLinks[linkIndex].categories?.[result.destination.index - 1]
              ?.index,
            boardLinks[linkIndex].categories?.[result.destination.index]?.index,
            boardLinks[linkIndex].categories?.[result.source.index].id
          )
        }

        const newItems = [...boardLinks]
        const [reorderedItem]: any = newItems[linkIndex].categories?.splice(
          result.source.index,
          1
        )
        newItems[linkIndex].categories?.splice(
          result.destination.index,
          0,
          reorderedItem
        )
        setBoardLinks(newItems)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const onDragStartCate = (linkIndex: number) => {
    setLinkCateDragging(linkIndex)
  }

  const updateOrCreateBoardLink = async (boardLink: BoardLinkInterface) => {
    setBoardSelected(boardLink)
    try {
      if (boardLink.id && boardLink.id !== NEW_ID) {
        const data = await BoardLinkApi.update(boardLink.id, boardLink)
        // setBoardSelected(data);
      } else {
        const { id, ...linkData } = boardLink
        const data = await BoardLinkApi.create(linkData)
        console.log('data', data)
        setBoardSelected(data)
      }
      setLastRefresh(Date.now())
      setBoardNameIndex(undefined)
    } catch (error) {
      showError(error)
    }
  }

  const boardLinkItem = (
    item: BoardLinkInterface,
    index: any,
    snapshot?: DraggableStateSnapshot
  ) => {
    const isCollapsed = boardSelected?.id !== item.id
    return (
      <div key={index} className={classNames('flex flex-col')}>
        <div
          className={classNames(
            'px-3 py-2 mb-1 rounded flex items-center cursor-pointer hover:bg-dayBreakBlue50',
            boardSelected?.id === item.id ? 'bg-dayBreakBlue50' : ''
          )}
          onDoubleClick={() => {
            if (item.id !== 'HOME')
              setTimeout(() => {
                setBoardNameIndex(index)
              }, 0)
          }}
          onClick={() => {
            setBoardSelected(item)
            setBoardNameIndex(undefined)
            // setLastRefresh(Date.now());
          }}
        >
          {editBoardNameIndex === index && item.id !== 'HOME' ? (
            // && item.id !== NEW_ID
            <BaseInput
              // key={Date.now()}
              styleInputContainer='h-9'
              onSave={(value) => {
                updateOrCreateBoardLink({
                  ...boardSelected,
                  name: value,
                })
              }}
              onBlur={(value) => {
                updateOrCreateBoardLink({
                  ...boardSelected,
                  name: value,
                })
              }}
              defaultValue={item.name}
              placeholder='Typing....'
              className='w-[170px]'
            />
          ) : (
            <div className='flex items-center justify-between flex-1'>
              <BaseText
                bold
                size={16}
                className={classNames(
                  boardSelected?.id === item.id || snapshot?.isDragging
                    ? 'text-dayBreakBlue500'
                    : ''
                )}
              >
                {item.name}
              </BaseText>
              <div
                className='p-1'
                onClick={(event) => {
                  event.stopPropagation() // Stop event propagation
                  if (boardSelected?.id === item.id) {
                    setBoardSelected({ id: '1', name: '1' })
                  }
                  //custom show list
                }}
              >
                <DownOutlined />
              </div>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <DragDropContext
            onDragStart={() => onDragStartCate(index)}
            onDragEnd={(result: any) => {
              onDragEndCategory(result, index)
            }}
          >
            <Droppable droppableId={`droppableCate-${item.id}`}>
              {(provided) => (
                <div
                  className='flex flex-col pl-8'
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {item.route === BOARD.EVENT_BOARD
                    ? (item.themas || []).map((elem: ThemaInterface, i) => (
                      <Draggable
                        key={elem?.id}
                        draggableId={elem?.id || ''}
                        index={i}
                      >
                        {(provided, snapshot) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className={classNames(
                              'hover:bg-dayBreakBlue50 rounded-lg px-2 py-1',
                              snapshot.isDragging ? 'bg-dayBreakBlue50' : ''
                            )}
                          >
                            <BaseText
                              key={`thema${i}`}
                              medium
                              size={16}
                              className={classNames(
                                snapshot.isDragging
                                  ? 'text-dayBreakBlue500'
                                  : 'text-darkNight700'
                              )}
                            >
                              {elem?.name || ''}
                            </BaseText>
                          </div>
                        )}
                      </Draggable>
                    ))
                    : (item.categories || []).map((elem, i) => (
                      <Draggable
                        key={elem.category?.id}
                        draggableId={elem.category?.id}
                        index={i}
                      >
                        {(provided, snapshot) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className={classNames(
                              'hover:bg-dayBreakBlue50 rounded-lg px-2 py-1',
                              snapshot.isDragging ? 'bg-dayBreakBlue50' : ''
                            )}
                          >
                            <BaseText
                              key={`category${i}`}
                              medium
                              size={16}
                              className={classNames(
                                snapshot.isDragging
                                  ? 'text-dayBreakBlue500'
                                  : 'text-darkNight700'
                              )}
                            >
                              {elem.category?.name}
                            </BaseText>
                          </div>
                        )}
                      </Draggable>
                    ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
        <div
          className={classNames(linkCateDragging === index ? 'h-[24px]' : '')}
        ></div>
      </div>
    )
  }

  return (
    <div className='w-[300px] border-r p-6 max-h-full overflow-auto no-scrollbar'>
      <div className={classNames('flex pb-4 items-center justify-between')}>
        <BaseText bold locale size={16} className=''>
          Main
        </BaseText>
        <PlusOutlined
          className={classNames('text-xl cursor-pointer')}
          onClick={createBoardLink}
        />
      </div>
      {boardLinkItem({ id: 'HOME', name: 'Home' }, 'HOME')}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppableThema'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {boardLinks.map((item: BoardLinkInterface, index: number) => {
                return (
                  <Draggable
                    key={item.id}
                    draggableId={item.id || NEW_ID}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={classNames(
                          snapshot.isDragging
                            ? 'bg-dayBreakBlue50 rounded-lg'
                            : ''
                        )}
                      >
                        {boardLinkItem(item, index, snapshot)}
                      </div>
                    )}
                  </Draggable>
                )
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
