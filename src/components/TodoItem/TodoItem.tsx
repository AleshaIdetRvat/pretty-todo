import React, { FC, useEffect, useRef, useState } from "react"
import { DragControls, Reorder, useDragControls } from "framer-motion"
import { ComponentWithSwipe } from "../UI/ComponentWithSwipe/ComponentWithSwipe"
import { ReorderIcon } from "../UI/Icons/ReorderIcon"
import { ITodoItem } from "../../types/Todo"
import "./TodoItem.css"

interface TodoInnerProps {
    layout: string
    onRemove: Function
    dragControls: DragControls
}

const TodoItemInner: FC<TodoInnerProps> = (props) => {
    const { layout, onRemove, dragControls } = props

    const itemRef: React.Ref<HTMLDivElement> = useRef(null)
    const reorderIconRef: React.Ref<HTMLDivElement> = useRef(null)
    const deleteBackRef: React.Ref<HTMLDivElement> = useRef(null)
    const [itemWidth, setItemWidth] = useState(0)

    useEffect(() => {
        setItemWidth(itemRef.current.offsetWidth)
        deleteBackRef.current.style.width = `${itemRef.current.offsetWidth}px`
    }, [])

    return (
        <>
            <ComponentWithSwipe
                onOpen={onRemove}
                onTouchStart={() => {
                    reorderIconRef.current.style.opacity = "0"
                }}
                onTouchEnd={() => {
                    reorderIconRef.current.style.opacity = "1"
                }}
                side='right'
                sideWidth={itemWidth}
                transition={0.5}
            >
                <div className='todo-item__body' ref={itemRef}>
                    {layout}
                </div>

                <div className='todo-item__delete-back' ref={deleteBackRef}>
                    <svg
                        fill='var(--white)'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        width='24px'
                        height='24px'
                    >
                        <path d='M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z' />
                    </svg>
                </div>
            </ComponentWithSwipe>

            <div className='todo-item__reorder-btn' ref={reorderIconRef}>
                <ReorderIcon
                    style={{
                        padding: "7px 0px 7px 7px",
                        alignSelf: "flex-start",
                    }}
                    dragControls={dragControls}
                />
            </div>
        </>
    )
}
interface ItemProps {
    children: string
    item: ITodoItem
    onRemove: Function
}

const TodoItem: FC<ItemProps> = React.memo((props) => {
    const { children, item, onRemove } = props
    const dragControls = useDragControls()

    return (
        <Reorder.Item
            className='todo-item'
            value={item}
            id={item.id}
            initial={{
                opacity: 0,
                scale: 0.8,
            }}
            animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.2, ease: "easeInOut" },
            }}
            exit={{
                opacity: 0,
                scaleY: 0.5,
                // borderRadius: "10px",
                // overflow: "hidden",
                x: "-60%",
                transition: { duration: 0.4, ease: "easeInOut" },
            }}
            dragListener={false}
            dragControls={dragControls}
            whileDrag={{
                boxShadow: "var(--main-shadow)",
                opacity: 0.6,
            }}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
        >
            <TodoItemInner
                dragControls={dragControls}
                onRemove={onRemove}
                layout={children}
            />
        </Reorder.Item>
    )
})

export { TodoItem }
