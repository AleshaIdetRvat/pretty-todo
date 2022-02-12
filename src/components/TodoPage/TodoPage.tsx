import React, { useCallback, useEffect, FC, useState } from "react"
import { AnimatePresence, Reorder } from "framer-motion"
import { TodoItem } from "../TodoItem/TodoItem"
import { ITodoItem } from "../../types/Todo"
import { useDebounce } from "../../hooks/useDebounce"
import { getTodosFromLS, saveTodosToLS } from "../../localStorage"
import { TodoListEmpty2 } from "../UI/Icons/TodoListEmpty2/TodoListEmpty2"
import "./TodoPage.css"

const TodoPage: FC = React.memo(() => {
    const [items, setItems] = useState<ITodoItem[]>([])

    const saveTodos = useDebounce(saveTodosToLS, 1000)

    useEffect(() => {
        const initTodos = getTodosFromLS()
        setItems(initTodos)
    }, [])

    useEffect(() => {
        saveTodos(items)
    }, [items, saveTodos])

    const removeTodoItem = useCallback(
        (id: string) => {
            setItems(items.filter((item) => item.id !== id))
        },
        [items]
    )

    const addNewItem = useCallback(() => {
        setItems([
            {
                completed: false,
                id: `${Date.now()}`,
                text: "",
            },
            ...items,
        ])
    }, [items])

    const saveNewItem = (id: string, todoText: string) => {
        items.find((item) => item.id === id).text = todoText
        setItems([...items])
    }

    const checkItem = (id: string, checked: boolean) => {
        items.find((item) => item.id === id).completed = checked
        setItems([...items])
    }

    return (
        <div className='todo-page'>
            <Reorder.Group
                className='todo-page__list'
                axis='y'
                values={items}
                onReorder={setItems}
            >
                <AnimatePresence initial={false}>
                    {items.length !== 0 ? (
                        items.map((item) => (
                            <TodoItem
                                onSave={saveNewItem}
                                onCheck={checkItem}
                                onRemove={() => removeTodoItem(item.id)}
                                item={item}
                                key={item.id}
                            >
                                {item.text}
                            </TodoItem>
                        ))
                    ) : (
                        <Reorder.Item
                            className='todo-item'
                            value={"empty-icon"}
                            id={"empty-icon"}
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    duration: 0.2,
                                    ease: "easeInOut",
                                },
                            }}
                            exit={{
                                opacity: 0,
                                height: "0",
                                y: "-100%",
                                transition: {
                                    duration: 0.4,
                                    ease: "easeInOut",
                                },
                            }}
                            dragListener={false}
                        >
                            <div className='todo-page__empty-img'>
                                <TodoListEmpty2 />
                            </div>
                        </Reorder.Item>
                    )}
                </AnimatePresence>
            </Reorder.Group>

            <button className='todo-page__add-btn' onClick={addNewItem}>
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
        </div>
    )
})

export { TodoPage }
