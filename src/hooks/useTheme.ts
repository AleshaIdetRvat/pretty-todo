import { useState } from "react"
import { saveAppThemeClassName, getAppThemeClassName } from "../localStorage"

type Return = [string, (theme: string) => void]

export const useTheme = (): Return => {
    const [currentTheme, setCurrTheme] = useState(getAppThemeClassName())

    const setTheme = (theme: string) => {
        saveAppThemeClassName(theme)
        document.body.className = `theme-${theme}`
        setCurrTheme(theme)
    }

    return [currentTheme, setTheme]
}
