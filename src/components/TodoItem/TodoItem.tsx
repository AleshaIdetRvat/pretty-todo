import React, { FC, useEffect, useRef, useState } from "react"
import { Reorder, useDragControls } from "framer-motion"
import { ReorderIcon } from "../UI/Icons/ReorderIcon"
import { ComponentWithSwipe } from "../UI/ComponentWithSwipe/ComponentWithSwipe"
import "./TodoItem.css"

interface ItemProps {
    children: string
}

const TodoItem: FC<ItemProps> = React.memo((props) => {
    const { children } = props
    console.log("todo item render -> " + children)
    const dragControls = useDragControls()

    const itemRef: React.Ref<HTMLDivElement> = useRef(null)
    const deleteBackRef: React.Ref<HTMLDivElement> = useRef(null)
    const [itemWidth, setItemWidth] = useState(0)

    useEffect(() => {
        setItemWidth(itemRef.current.offsetWidth)
        deleteBackRef.current.style.width = `${itemRef.current.offsetWidth}px`
    }, [])

    return (
        <Reorder.Item
            className='todo-item'
            initial={{
                opacity: 0,
                scale: 0.8,
            }}
            animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.2, ease: "easeInOut" },
            }}
            exit={{ opacity: 0, x: "-100%", transition: { duration: 0.3 } }}
            dragListener={false}
            dragControls={dragControls}
            whileDrag={{
                boxShadow: "var(--main-shadow)",
                opacity: 0.5,
            }}
            value={children}
            id={children}
            onTouchMove={(e) => e.stopPropagation()}
        >
            <ComponentWithSwipe
                onOpen={() => console.log("open")}
                onClose={() => console.log("close")}
                side='right'
                sideWidth={itemWidth}
                transition={0.5}
                style={{ borderRadius: "6px" }}
            >
                <div ref={itemRef} className='todo-item__body'>
                    {children}
                </div>
                <div ref={deleteBackRef} className='todo-item__delete-back'>
                    <svg
                        fill='var(--black)'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        width='24px'
                        height='24px'
                    >
                        <path d='M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z' />
                    </svg>
                </div>
            </ComponentWithSwipe>

            <ReorderIcon dragControls={dragControls} />
        </Reorder.Item>
    )
})

export { TodoItem }
