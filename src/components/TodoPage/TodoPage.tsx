import { FC, useState } from "react"
import { Reorder, useDragControls } from "framer-motion"
import { ReorderIcon } from "../UI/Icons/ReorderIcon"

interface ItemProps {
    children: string
}

const Item: FC<ItemProps> = (props) => {
    const { children } = props
    const dragControls = useDragControls()

    return (
        <Reorder.Item
            style={{ display: "flex", justifyContent: "space-between" }}
            dragListener={false}
            dragControls={dragControls}
            value={children}
            id={children}
        >
            {/* TODO: Обернуть в компонент для удаления свайпом */}
            <div>{children}</div>
            <ReorderIcon dragControls={dragControls} />
        </Reorder.Item>
    )
}

const TodoPage: FC = (props) => {
    const initialItems = ["🍅 Tomato", "🥒 Cucumber", "🧀 Cheese", "🥬 Lettuce"]

    const [items, setItems] = useState<string[]>(initialItems)

    return (
        <Reorder.Group
            className='todo-list'
            axis='y'
            onReorder={setItems}
            values={items}
        >
            {items.map((item) => (
                <Item key={item}>{item}</Item>
            ))}
        </Reorder.Group>
    )
}

export { TodoPage }
