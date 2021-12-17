import { FC, useState } from "react"
import { AnimatePresence, Reorder } from "framer-motion"
import { TodoItem } from "../TodoItem/TodoItem"
import "./TodoPage.css"

const TodoPage: FC = (props) => {
    const initialItems = ["🍅 Tomato", "🥒 Cucumber", "🧀 Cheese", "🥬 Lettuce"]

    const [items, setItems] = useState<string[]>(initialItems)
    const handleDelete = () => {
        const itemsClone = [...items]
        setItems(itemsClone)
    }
    const handleAdd = () => {
        const itemsClone = [...items]
        itemsClone.unshift(`${Date.now()}`)
        setItems(itemsClone)
    }
    return (
        <>
            <Reorder.Group
                className='todo-list'
                axis='y'
                onReorder={setItems}
                values={items}
            >
                <AnimatePresence initial={false}>
                    {items.map((item) => (
                        <TodoItem key={item}>{item}</TodoItem>
                    ))}
                </AnimatePresence>
            </Reorder.Group>
            <button onClick={handleDelete}>delete item</button>
            <br />
            <button onClick={handleAdd}>add item</button>
        </>
    )
}

export { TodoPage }
