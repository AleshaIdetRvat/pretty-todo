import { ITodoItem } from "../types/Todo"

const TODOS_KEY = "todos"
const THEME_KEY = "theme"
export const getTodosFromLS = (): ITodoItem[] => {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY)) as ITodoItem[]

    if (todos && todos.length !== 0) {
        return todos
    }
    return []
}

export const saveTodosToLS = (todos: ITodoItem[]): void => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
}

export const getAppThemeClassName = (): string => {
    const savedTheme = localStorage.getItem(THEME_KEY)
    if (savedTheme === null) {
        saveAppThemeClassName("theme-default")
        return "theme-default"
    }
    return savedTheme
}

export const saveAppThemeClassName = (themeName: string): void => {
    localStorage.setItem(THEME_KEY, themeName)
}
