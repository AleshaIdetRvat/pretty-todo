import React, { useCallback, useMemo } from "react"
import { FC, useState } from "react"
import { AnimatePresence, Reorder } from "framer-motion"
import { TodoItem } from "../TodoItem/TodoItem"
import { ITodoItem } from "../../types/Todo"
import "./TodoPage.css"

const TodoPage: FC = React.memo(() => {
    const initialItems: ITodoItem[] = [
        { completed: false, id: "1", text: "🍅 Tomato" },
        { completed: false, id: "2", text: "🥒 Cucumber" },
        { completed: false, id: "3", text: "🧀 Cheese" },
        { completed: false, id: "4", text: "🥬 Lettuce" },
    ]

    const [items, setItems] = useState<ITodoItem[]>(initialItems)

    console.log("📝TodoPage render", items)

    const removeTodoItem = useCallback(
        (id: string) => {
            setItems(items.filter((item) => item.id !== id))
        },
        [items]
    )

    const handleAdd = () => {
        const itemsClone = [...items]
        itemsClone.unshift({
            completed: false,
            id: "5",
            text: "@ Something",
        })
        setItems(itemsClone)
    }

    return (
        <>
            <Reorder.Group
                className='todo-list'
                axis='y'
                values={items}
                onReorder={setItems}
            >
                <AnimatePresence initial={false}>
                    {items.map((item) => (
                        <TodoItem
                            onRemove={() => removeTodoItem(item.id)}
                            item={item}
                            key={item.id}
                        >
                            {item.text}
                        </TodoItem>
                    ))}
                </AnimatePresence>
            </Reorder.Group>

            <button className='todo-list__add-btn' onClick={handleAdd}>
                +
            </button>
        </>
    )
})

export { TodoPage }
