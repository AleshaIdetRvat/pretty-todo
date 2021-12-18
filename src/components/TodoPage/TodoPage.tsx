import React, { useCallback } from "react"
import { FC, useState } from "react"
import { AnimatePresence, Reorder } from "framer-motion"
import { TodoItem } from "../TodoItem/TodoItem"
import { ITodoItem } from "../../types/Todo"
import "./TodoPage.css"

const TodoPage: FC = React.memo(() => {
    console.log("Todo page render")

    const initialItems: ITodoItem[] = [
        {
            completed: false,
            id: "1",
            text: "🍅 Tomato 🍅 Tomato🍅 Tom ato🍅 Tsos ddmato🍅 Toma to🍅 Tomato",
        },
        { completed: false, id: "2", text: "🥒 Cucumber" },
        { completed: false, id: "3", text: "🧀 Cheese" },
        { completed: false, id: "4", text: "🥬 Lettuce" },
    ]

    const [items, setItems] = useState<ITodoItem[]>(initialItems)

    const removeTodoItem = useCallback(
        (id: string) => {
            setItems(items.filter((item) => item.id !== id))
        },
        [items]
    )

    const addNewItem = () => {
        const itemsClone = [...items]
        itemsClone.unshift({
            completed: false,
            id: `${Date.now()}`,
            text: "",
        })
        setItems(itemsClone)
    }

    const saveNewItem = (id: string, todoText: string) => {
        items.find((item) => item.id === id).text = todoText
        setItems([...items])
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
                            onSave={saveNewItem}
                            onRemove={() => removeTodoItem(item.id)}
                            item={item}
                            key={item.id}
                        >
                            {item.text}
                        </TodoItem>
                    ))}
                </AnimatePresence>
            </Reorder.Group>

            <button className='todo-list__add-btn' onClick={addNewItem}>
                <svg
                    baseProfile='tiny'
                    height='12vw'
                    version='1.2'
                    viewBox='0 0 24 24'
                    width='12vw'
                >
                    <path
                        fill='var(--white)'
                        d='M18,10h-4V6c0-1.104-0.896-2-2-2s-2,0.896-2,2l0.071,4H6c-1.104,0-2,0.896-2,2s0.896,2,2,2l4.071-0.071L10,18  c0,1.104,0.896,2,2,2s2-0.896,2-2v-4.071L18,14c1.104,0,2-0.896,2-2S19.104,10,18,10z'
                    />
                </svg>
            </button>
        </>
    )
})

export { TodoPage }
