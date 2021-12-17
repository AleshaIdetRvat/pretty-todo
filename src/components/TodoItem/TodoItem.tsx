import { FC } from "react"
import { Reorder, useDragControls, motion } from "framer-motion"
import { ReorderIcon } from "../UI/Icons/ReorderIcon"
import "./TodoItem.css"

interface ItemProps {
    children: string
}

const TodoItem: FC<ItemProps> = (props) => {
    const { children } = props
    const dragControls = useDragControls()

    return (
        <Reorder.Item
            className='todo-item'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: 1,
                scale: 1,
                // transition: { duration: 0.2, ease: "easeInOut" },
            }}
            exit={{ opacity: 0, x: "-100%", transition: { duration: 0.3 } }}
            dragListener={false}
            dragControls={dragControls}
            whileDrag={{ boxShadow: "var(--main-shadow)" }}
            style={{ transition: "background-color 0.2s" }}
            value={children}
            id={children}
        >
            {/* todo: Обернуть в компонент для удаления свайпом */}
            <motion.div
                className='todo-item__body'
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    transition: "0.2s",
                }}
            >
                <motion.p>{children}</motion.p>
                <ReorderIcon dragControls={dragControls} />
            </motion.div>
        </Reorder.Item>
    )
}

export { TodoItem }
