import React, { FC, useEffect, useRef, useState } from "react"
import { DragControls, Reorder, useDragControls } from "framer-motion"
import { ComponentWithSwipe } from "../UI/ComponentWithSwipe/ComponentWithSwipe"
import { ReorderIcon } from "../UI/Icons/ReorderIcon/ReorderIcon"
import { ITodoItem } from "../../types/Todo"
import { Checkbox } from "../UI/Checkbox/Checkbox"
import "./TodoItem.css"

interface TodoInnerProps {
    isChecked: boolean
    layout: string
    onRemove: Function
    dragControls: DragControls
    onCheck: (checked: boolean) => void
}

const TodoItemInner: FC<TodoInnerProps> = React.memo((props) => {
    const { layout, onRemove, dragControls, isChecked, onCheck } = props

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
                transition={0.1}
                autoTransition={0.5}
            >
                <div className='todo-item__body' ref={itemRef}>
                    <div
                        className='todo-item__checkbox'
                        onTouchStart={(e) => e.stopPropagation()}
                    >
                        <Checkbox
                            className='todo-item__checkbox-inner'
                            checked={isChecked}
                            onChange={() => onCheck(!isChecked)}
                        />
                    </div>
                    <p
                        className={`todo-item__text ${
                            isChecked ? "--checked" : ""
                        }`}
                    >
                        {layout}
                    </p>
                </div>

                <div className='todo-item__delete-back' ref={deleteBackRef}>
                    <svg
                        fill='var(--white)'
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
                    dragControls={dragControls}
                    style={{
                        padding: "7px 0px 7px 9px",

                        width: "clamp(20px, 10vw, 60px)",
                        height: "clamp(20px, 10vw, 60px)",
                    }}
                />
            </div>
        </>
    )
})

interface NewTodoMessageProps {
    onBlur: React.FocusEventHandler<HTMLInputElement>
}

const NewTodoMessage: FC<NewTodoMessageProps> = (props) => {
    const { onBlur } = props

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
        onBlur(e)
    }

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        const input = e.target as HTMLInputElement
        if (e.key === "Enter") {
            input.blur()
        }
    }

    return (
        <div className='todo-item__new-message'>
            <svg
                width='60'
                height='30'
                viewBox='0 0 100 40'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='todo-item__input-arrow'
            >
                <path
                    d='M16 17C14.8954 17 14 17.8954 14 19C14 20.1046 14.8954 21 16 21V17ZM70.4142 20.4142C71.1953 19.6332 71.1953 18.3668 70.4142 17.5858L57.6863 4.85786C56.9052 4.07682 55.6389 4.07682 54.8579 4.85786C54.0768 5.63891 54.0768 6.90524 54.8579 7.68629L66.1716 19L54.8579 30.3137C54.0768 31.0948 54.0768 32.3611 54.8579 33.1421C55.6389 33.9232 56.9052 33.9232 57.6863 33.1421L70.4142 20.4142ZM16 21H69V17H16V21Z'
                    fill='var(--foreground)'
                />
            </svg>
            <input
                className='todo-item__input'
                placeholder='New todo'
                autoFocus
                onBlur={handleBlur}
                onKeyDown={onKeyDown}
            />
        </div>
    )
}

interface ItemProps {
    children: string
    item: ITodoItem
    onRemove: Function
    onSave: (id: string, newText: string) => void
    onCheck: (id: string, checked: boolean) => void
}

const TodoItem: FC<ItemProps> = React.memo((props) => {
    const { children, item, onRemove, onSave, onCheck } = props

    const dragControls = useDragControls()

    const blurHandler: React.FocusEventHandler<HTMLInputElement> = (e) => {
        const newText = e.target.value.trim()
        if (newText !== "") {
            onSave(item.id, newText)
        } else {
            onRemove()
        }
    }

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
                x: "-60%",
                transition: { duration: 0.4, ease: "easeInOut" },
            }}
            dragListener={false}
            dragControls={dragControls}
            whileDrag={{
                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
                opacity: 0.6,
            }}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
        >
            {children !== "" ? (
                <TodoItemInner
                    dragControls={dragControls}
                    onRemove={onRemove}
                    layout={children}
                    onCheck={(checked: boolean) => {
                        onCheck(item.id, checked)
                    }}
                    isChecked={item.completed}
                />
            ) : (
                <NewTodoMessage onBlur={blurHandler} />
            )}
        </Reorder.Item>
    )
})

export { TodoItem }
