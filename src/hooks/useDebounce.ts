import { useCallback, useRef } from "react"

export function useDebounce(callback: Function, delay: number): Function {
    const timer = useRef(null)

    const debouncedCallback = useCallback(
        (...args) => {
            if (timer.current) {
                clearTimeout(timer.current)
            }

            timer.current = setTimeout(() => {
                callback(...args)
            }, delay)
        },
        [callback, delay]
    )

    return debouncedCallback
}
