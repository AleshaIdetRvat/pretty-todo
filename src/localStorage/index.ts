import { ITodoItem } from "../types/Todo"

const todosLSKey = "todos"

export const getTodosFromLS = (): ITodoItem[] => {
    const todos = JSON.parse(localStorage.getItem(todosLSKey)) as ITodoItem[]

    if (todos && todos.length !== 0) {
        return todos
    }
    return []
}

export const saveTodosToLS = (todos: ITodoItem[]) => {
    localStorage.setItem(todosLSKey, JSON.stringify(todos))
}
